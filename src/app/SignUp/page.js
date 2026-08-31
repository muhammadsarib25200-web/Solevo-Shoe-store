"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import "./signUp.css";
import { useRouter } from "next/navigation";
import { FaHouseMedical } from "react-icons/fa6";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    ConfirmPassword :"",
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    // Confirm Password validation
    if (!formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    // Validate form before making API call
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try{
      const res = await fetch('/api/signup',{
        method : 'post',
        headers : {'content-type' : 'application/json'},
        body:JSON.stringify({
          name : formData.name,
          email : formData.email,
          password : formData.password,
        }),
      });
      const data = await res.json();

      if(!res.ok){
        setApiError(data.error || 'something went wrong');
        setLoading(false);
        return;
      }

      router.push("/Login");
    }catch(error){
      setApiError('Something went wrong, please try again');
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <section className="signup-container">
        {/* Left promotional section */}
        <div className="signup-left">
          <div className="signup-left-top">
            <Link href="/" className="signup-logo">
              <span className="logo-arrow">❮</span>
              <span>SOLEVO</span>
            </Link>

            <span className="signup-number">01</span>
          </div>

          <div className="signup-left-content">
            <span className="signup-tag">NEW EXPERIENCE</span>

            <h1>
              Step into
              <br />
              your new
              <br />
              <span>style.</span>
            </h1>

            <p>
              Join TSSF Shoes and discover footwear created for comfort,
              performance and every occasion.
            </p>
          </div>

          <div className="shoe-visual">
            <div className="shoe-text">RUNNING</div>

            {/* Apni shoe image public/images/signup-shoe.png mein rakhein */}
            <Image
                    src="/assets/shoe.png"
              alt="TSSF running shoe"
              width={480}
              height={300}
              className="signup-shoe-image"
              priority
            />
            
          </div>

          <div className="signup-left-footer">
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

        {/* Right signup form */}
        <div className="signup-right">
          <div className="signup-mobile-logo">
            <Link href="/">TSSF Shoes</Link>
          </div>

          <div className="signup-form-header">
            <span className="form-small-text">CREATE YOUR PROFILE</span>

            <h2>Create Account</h2>

            <p>
              Enter your information below to start your shopping journey.
            </p>
          </div>

          <div className="social-signup-buttons">
            <button type="button" className="social-signup-button">
              <FcGoogle />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="social-signup-button facebook-button"
            >
              <FaFacebookF />
              <span>Facebook</span>
            </button>
          </div>

          <div className="signup-divider">
            <span></span>
            <p>OR CONTINUE WITH EMAIL</p>
            <span></span>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-input-container">
              <label htmlFor="fullName">Full Name</label>

              <div className="signup-input-box">
                <FiUser />

                <input
                  id="fullName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="signup-input-container">
              <label htmlFor="email">Email Address</label>

              <div className="signup-input-box">
                <FiMail />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="signup-input-container">
              <label htmlFor="password">Password</label>

              <div className="signup-input-box">
                <FiLock />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            <div className="signup-input-container">
              <label htmlFor="ConfirmPassword">Confirm password</label>

              <div className="signup-input-box">
                <FiLock />

                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="confirm password"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
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
              {errors.ConfirmPassword && <p className="error-text">{errors.ConfirmPassword}</p>}
            </div>

            <label className="signup-checkbox">
              <input type="checkbox" />

              <span className="custom-checkbox"></span>

              <span>
                I agree to the <a href="#">Terms and Conditions</a>
              </span>
            </label>

            {apiError && <p className="error-text" style={{textAlign: 'center', marginBottom: '1rem'}}>{apiError}</p>}

            <button type="submit" disabled={loading} className="btn">
              <strong>{loading ? 'create Accounting' : 'signup'}</strong>
              <div className="container-stars">
                <div className="stars"></div>
              </div>
              <div className="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>

          </form>

          <p className="signup-security-text">
            Your information is protected and securely stored.
          </p>
        </div>
      </section>
    </main>
  );
}