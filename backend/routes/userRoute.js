import express from "express";
import { loginUser, registerUser, verifyEmail,resetPassword,forgotPassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify-email/:token", verifyEmail);
  // New verification route
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);


export default userRouter;