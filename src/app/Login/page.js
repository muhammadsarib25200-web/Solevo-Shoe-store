"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import "./login.css";
import {useRouter} from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router  = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email : "",
    password : "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name] : value});
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    
    // Validate form before making API call
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try{
      const res = await fetch('/api/login', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
          email : formData.email,
          password : formData.password,
        }),
      });

      const data = await res.json();
      if(!res.ok){
        setApiError(data.error || "something went wrong");
        setLoading(false);
        return;
      }

      console.log("USER FROM LOGIN:", data.user);
      console.log("USER ID FROM LOGIN:", data.user?._id);

      dispatch(setCredentials({user : data.user, token : data.token}));
      router.push('/AllProducts');
    }catch(error){
      setApiError('Something went wrong, please try again');
      setLoading(false);
    }
  }
  return (
    <main className="login-page">
      <section className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="login-left-top">
            <Link href="/" className="login-logo">
              <span className="logo-arrow">❮</span>
              <span>SOLEVO</span>
            </Link>

            <span className="login-number">02</span>
          </div>

          <div className="login-left-content">
            <span className="login-tag">WELCOME BACK</span>

            <h1>
              Continue
              <br />
              your style
              <br />
              <span>journey.</span>
            </h1>

            <p>
              Sign in to access your orders, wishlist and personalized shoe
              collection.
            </p>
          </div>

          <div className="shoe-visual">
            <div className="shoe-text">RUNNING</div>

            <Image
                    src="/assets/shoe.png"
             alt="TSSF running shoe"
              width={480}
              height={300}
              className="login-shoe-image"
              priority
            />
          </div>

          <div className="login-left-footer">
            <div>
              <strong>120+</strong>
              <span>Premium Shoes</span>
            </div>

            <div>
              <strong>4.9/5</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-mobile-logo">
            <Link href="/">TSSF Shoes</Link>
          </div>

          <div className="login-form-header">
            <span className="form-small-text">ACCESS YOUR ACCOUNT</span>

            <h2>Welcome Back</h2>

            <p>Enter your username and password to continue shopping.</p>
          </div>

          <div className="social-login-buttons">
            <button type="button" className="social-login-button">
              <FcGoogle />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="social-login-button facebook-button"
            >
              <FaFacebookF />
              <span>Facebook</span>
            </button>
          </div>

          <div className="login-divider">
            <span></span>
            <p>OR CONTINUE WITH ACCOUNT</p>
            <span></span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-container">
              <label htmlFor="email">Email</label>

              <div className="login-input-box">
                <FiUser />

                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="login-input-container">
              <label htmlFor="password">Password</label>

              <div className="login-input-box">
                <FiLock />

                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="login-options">
              <label className="remember-checkbox">
                <input type="checkbox" />

                <span className="custom-checkbox"></span>

                <span>Remember me</span>
              </label>

              <Link href="#" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {apiError && <p className="error-text" style={{textAlign: 'center', marginBottom: '1rem'}}>{apiError}</p>}

            <button type="submit" disabled={loading} className="btn">
              <strong>{loading ? 'Logging in...' : 'login'}</strong>
              <div className="container-stars">
                <div className="stars"></div>
              </div>
              <div className="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>

          </form>

          <p className="create-account-text">
            Don&apos;t have an account?{" "}
            <Link href="/SignUp">Create Account</Link>
          </p>

          <p className="login-security-text">
            Secure login for a safe shopping experience.
          </p>
        </div>
      </section>
    </main>
  );
}