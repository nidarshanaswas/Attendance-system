import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import leftImage from "../../assets/Saly-3.png";
import rightImage from "../../assets/Saly-2.png";
import logo from "../../assets/user.png";
import google from "../../assets/google1.png";
import facebook from "../../assets/facebook1.png";
import github from "../../assets/github1.png";
import { showLoader, hideLoader } from "../../features/loader/loaderSlice";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function LoginPage() {
    console.log(showLoader);
    console.log(hideLoader);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [errors, setErrors] = useState({ userName: "", passwordHash: "", });

    // const handleLogin = async () => {
    //     const payload = {
    //         name: userName,
    //         password: passwordHash,
    //     };

    //     dispatch(showLoader());

    //     try {
    //         const data = await dispatch(loginUser(payload));

    //         if (data?.payload?.user) {
    //             localStorage.setItem(
    //                 "user",
    //                 JSON.stringify(data.payload.user)
    //             );

    //             localStorage.setItem(
    //                 "token",
    //                 data.payload.token
    //             );

    //             setTimeout(() => {
    //                 dispatch(hideLoader());
    //                 navigate("/dashboard");
    //             }, 100);
    //         } else {
    //             dispatch(hideLoader());
    //             alert("Invalid Username or Password");
    //         }
    //     } catch (err) {
    //         dispatch(hideLoader());
    //         console.log(err);
    //     }
    // };
    const validateForm = () => {
        let newErrors = {};

        // Username validation
        if (!userName.trim()) {
            newErrors.userName = "Username is required";
        } else if (userName.trim().length < 3) {
            newErrors.userName =
                "Username must be at least 3 characters";
        }

        // Password validation
        if (!passwordHash.trim()) {
            newErrors.passwordHash =
                "Password is required";
        } else if (passwordHash.length < 8) {
            newErrors.passwordHash =
                "Password must be at least 8 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }
        const payload = {
            name: userName,
            password: passwordHash,
        };

        dispatch(showLoader());

        try {
            const data = await dispatch(
                loginUser(payload)
            ).unwrap();

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            localStorage.setItem(
                "token",
                data.token
            );

            toast.success("Login successful");

            dispatch(hideLoader());

            navigate("/dashboard");
        } catch (error) {
            dispatch(hideLoader());

            console.log("Login Error:", error);

            if (Array.isArray(error?.errors)) {
                error.errors.forEach((msg) =>
                    toast.error(msg)
                );
            } else {
                toast.error(
                    error?.message ||
                    "Invalid Username or Password"
                );
            }
        }
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
                    <label>User Name  <span>*</span></label>
                    <input
                        type="userName"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            setErrors({ ...errors, userName: "", });
                        }}
                        placeholder="UserName"
                    />
                    {errors.userName && (
                        <p className="error-message">
                            {errors.userName}
                        </p>
                    )}
                    <label>Password  <span>*</span></label>

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={passwordHash}
                            onChange={(e) => {
                                setPasswordHash(e.target.value);
                                setErrors({ ...errors, passwordHash: "", });
                            }}
                            placeholder="Password"
                        />


                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.userName && (
                        <p className="error-message">
                            {errors.userName}
                        </p>
                    )}
                    <a href="/" className="forgot">
                        Forgot Password?
                    </a>
                    <button
                        className="signin-btn"
                        onClick={handleLogin}
                    >
                        Login In
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
