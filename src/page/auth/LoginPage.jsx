import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import leftImage from "../../assets/Saly-3.png";
import rightImage from "../../assets/Saly-2.png";
import logo from "../../assets/user.png";
import google from "../../assets/google1.png";
import facebook from "../../assets/facebook1.png";
import github from "../../assets/github1.png";

import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authActions";

function LoginPage() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [passwordHash, setPasswordHash] = useState("");

    const handleLogin = async () => {
        const payload = {
            name: userName,
            password: passwordHash,
        };
        console.log(323233);

        const result = await dispatch(loginUser(payload)).then((data) => {
            console.log(data, data?.payload?.user,'2323');
            if (data?.payload?.user) {
                localStorage.setItem("user",JSON.stringify(data?.payload?.user))
                localStorage.setItem("token", data?.payload?.token)
                navigate("/dashboard");
            } else {
                alert("Invalid Username or Password");
            }
        }).catch((err) => {
            console.log(err, 32323);

        })



        // console.log(result,'result');


    };
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="left-panel">
                    <h2 className="logo">Your Logo</h2>
                    <div className="mobile-avatar">
                        <img src={logo} alt="avathar" />
                    </div>
                    <img
                        src={rightImage}
                        alt="Illustration"
                        className="left-image"
                    />
                </div>
                <div className="login-card">
                    <div className="card-header">
                        <div>
                            <h1>Sign In</h1>
                        </div>

                    </div>
                    <label>User Name</label>
                    <input
                        type="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="UserName"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        placeholder="Password"
                    />
                    <a href="/" className="forgot">
                        Forgot Password?
                    </a>
                    <button
                        className="signin-btn"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    <div className="divider">
                        <span>Or continue with</span>
                    </div>
                    <div className="social-buttons">
                        <button >
                            <img src={google} alt="google" className="social-img" />
                        </button>
                        <button>
                            <img src={facebook} alt="google" className="social-img" />
                        </button>
                        <button>
                            <img src={github} alt="google" className="social-img" />
                        </button>

                    </div>
                    <div className="sing-up">
                        <small>No Account ?</small>
                        <a href="/"> Sign up    </a>
                    </div>
                </div>
                <div className="right-panel">
                    <img
                        src={leftImage}
                        alt="Illustration"
                        className="right-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
