"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footerElement = footerRef.current;

    if (!footerElement) return;

    const showFooter = () => {
      footerElement.classList.add("footer-visible");
    };

    showFooter();

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showFooter();
          observer.unobserve(footerElement);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(footerElement);

    return () => observer.disconnect();
  }, []);

  function handleNewsletterSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.elements.email;

    if (!emailInput.value.trim()) return;

    emailInput.value = "";
  }

  return (
    <footer ref={footerRef} className="site-footer">
      {/* Background glow */}

      <div className="footer-glow footer-glow-left"></div>
      <div className="footer-glow footer-glow-right"></div>

      {/* Moving text */}

      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          <span>STEP INTO STYLE</span>
          <b>✦</b>

          <span>COMFORT IN EVERY STEP</span>
          <b>✦</b>

          <span>BUILT FOR EVERY MOVE</span>
          <b>✦</b>

          <span>STEP INTO STYLE</span>
          <b>✦</b>

          <span>COMFORT IN EVERY STEP</span>
          <b>✦</b>

          <span>BUILT FOR EVERY MOVE</span>
          <b>✦</b>
        </div>
      </div>

      {/* Main footer content */}

      <div className="footer-main">
        <div className="footer-brand footer-reveal footer-delay-one">
          <Link href="/" className="footer-logo">
            <span className="footer-logo-mark">S</span>

            <span className="footer-logo-content">
              <strong>ShoeStore</strong>
              <small>Move beyond limits</small>
            </span>
          </Link>

          <h2>
            Style made for
            <br />
            every step.
          </h2>

          <p>
            Premium footwear designed for comfort, performance and
            confident everyday movement.
          </p>

          <form
            className="footer-newsletter"
            onSubmit={handleNewsletterSubmit}
          >
            <label htmlFor="footer-email">
              Get new drops and special offers
            </label>

            <div className="footer-input-box">
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              <button type="submit" aria-label="Subscribe">
                <span>Join</span>
                <b>↗</b>
              </button>
            </div>
          </form>
        </div>

        <div className="footer-links footer-reveal footer-delay-two">
          <div className="footer-column">
            <h3>Shop</h3>

            <Link href="/all-products">All Products</Link>
            <Link href="/all-products">New Arrivals</Link>
            <Link href="/all-products">Running</Link>
            <Link href="/all-products">Lifestyle</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/journal">Journal</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>

            <Link href="/faq">FAQs</Link>
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/size-guide">Size Guide</Link>
          </div>
        </div>
      </div>

      {/* Large brand text */}

      <div className="footer-wordmark footer-reveal footer-delay-three">
        SHOESTORE
      </div>

      {/* Bottom footer */}

      <div className="footer-bottom footer-reveal footer-delay-four">
        <p>© 2026 ShoeStore. All rights reserved.</p>

        <div className="footer-policy-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <div className="footer-social-links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            FB
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            YT
          </a>
        </div>
      </div>
    </footer>
  );
}