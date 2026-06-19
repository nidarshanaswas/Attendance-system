import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import leftImage from "../../assets/Saly-3.png";
import rightImage from "../../assets/Saly-2.png";
import logo from "../../assets/user.png";
import google from "../../assets/google1.png";
import facebook from "../../assets/facebook1.png";
import github from "../../assets/github1.png";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
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
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="username or email address"
                    />
                    <label>Password</label>
                    <input
                        type="password"
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
