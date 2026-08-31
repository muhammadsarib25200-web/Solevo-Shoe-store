"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import { useEffect, useState } from "react";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState("");
  const dispatch = useDispatch();
  const { isLogginIn, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    let noticeTimeoutId;
    const handleCartAdded = (event) => {
      setCartNotice(`${event.detail} added to your cart`);
      clearTimeout(noticeTimeoutId);
      noticeTimeoutId = setTimeout(() => setCartNotice(""), 2500);
    };

    window.addEventListener("cart:item-added", handleCartAdded);
    return () => {
      window.removeEventListener("cart:item-added", handleCartAdded);
      clearTimeout(noticeTimeoutId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      <div className="sale">Enjoy an exclusive 10% coupon for your first purchase</div>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand logo" href="/Home">
              <span className="logo-slogan">Step Into Style</span>
              <span className="logo-name">SOLEVO</span>
            </Link>

            <button
              className={`navbar-toggler ${isMenuOpen ? "" : "collapsed"}`}
              type="button"
              aria-controls="navbarTogglerDemo02"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
              id="navbarTogglerDemo02"
            >

      <ul className="navbar-nav  ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" href="/AllProducts" onClick={() => setIsMenuOpen(false)}>
            All products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/WishList" onClick={() => setIsMenuOpen(false)}>
            Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/AddToCart" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>
        </li>
          {!isLogginIn ? (
            <>
              <li className="nav-item ">
                <Link className="nav-link" href="/SignUp" onClick={() => setIsMenuOpen(false)}>
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/Login" onClick={() => setIsMenuOpen(false)}>
                  LogIn
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link auth-logout-button"
                  onClick={() => {
                    dispatch(logout());
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item profile-item">
                <div className="header-profile" title={user?.email}>
                  <span className="profile-avatar" aria-hidden="true">
                    {user?.name?.charAt(0).toUpperCase() || <FiUser />}
                  </span>
                  <span className="profile-details">
                    <strong>{user?.name || "User"}</strong>
                    <small>{user?.email}</small>
                  </span>
                </div>
              </li>
            </>
          )}
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="search-icon">
          <FaSearch />
          </div>
        <Link className="add-cart-btn" href="/AddToCart" aria-label={`Cart with ${cartCount} items`}>
          <FaCartFlatbedSuitcase />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </form>
            </div>
          </div>
        </nav>
      </div>
      {cartNotice && <div className="cart-notice" role="status">{cartNotice}</div>}
    </header>
  );
} 