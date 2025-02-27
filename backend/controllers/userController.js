import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send a verification email
const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:4000/api/user/verify-email/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `<h2>Welcome to Pizza Delivery!</h2>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}" target="_blank">Verify Email</a>`
    };

    await transporter.sendMail(mailOptions);
};

// Forgot Password - Send reset email
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: `<h2>Password Reset Request</h2>
                   <p>Click the link below to reset your password. This link is valid for 15 minutes:</p>
                   <a href="${resetLink}" target="_blank">Reset Password</a>`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Password reset link sent to your email!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error sending password reset email" });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ success: true, message: "Password reset successful!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid or expired token." });
    }
};


// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            verified: false
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        await sendVerificationEmail(email, token);

        res.json({ success: true, message: "Verification email sent! Please check your inbox." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Verify Email
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await userModel.findByIdAndUpdate(decoded.id, { verified: true });

        res.send(`
            <h2>You have been verified!</h2>
            <p>Redirecting to login page...</p>
            <script>
                setTimeout(() => {
                    window.location.href = "http://localhost:5173";
                }, 3000);
            </script>
        `);
    } catch (error) {
        console.log(error);
        res.send("<h2>Invalid or expired token.</h2>");
    }
};

// Login User (Only verified users can log in)
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        if (!user.verified) {
            return res.json({ success: false, message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser, verifyEmail, resetPassword,forgotPassword};