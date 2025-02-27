import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = async () => {
        const response = await axios.post(`http://localhost:4000/api/user/reset-password/${token}`, { newPassword });

        if (response.data.success) {
            alert("Password reset successful! Redirecting to login...");
            navigate("/login");
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;
