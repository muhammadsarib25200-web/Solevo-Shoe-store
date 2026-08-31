"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { FiHeart, FiShield, FiStar, FiTruck } from "react-icons/fi";
import "./productDetail.css";

const featureCards = [
  {
    title: "Premium Quality",
    text: "Crafted with attention to every detail.",
    icon: <FiStar />,
  },
  {
    title: "Comfortable Fit",
    text: "Designed for all-day ease and support.",
    icon: <FiHeart />,
  },
  {
    title: "Fast Delivery",
    text: "Quick dispatch and careful packaging.",
    icon: <FiTruck />,
  },
  {
    title: "Secure Payment",
    text: "Protected checkout with trusted payment options.",
    icon: <FiShield />,
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetail({ id }) {
  const products = useSelector((states) => states.products.items);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [products, id]
  );

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter((item) => item.id !== product.id).slice(0, 4)
        : [],
    [products, product]
  );

  if (!product) {
    return <div className="empty-product">Product not found.</div>;
  }

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      dispatch(addToCart(product));
    }
    window.dispatchEvent(new CustomEvent("cart:item-added", { detail: product.name }));
  };

  return (
    <main className="product-detail-page">
      <div className="product-detail-shell">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/AllProducts">Shop</Link>
          <span>/</span>
          <span className="product-breadcrumb-current">{product.name}</span>
        </nav>

        <section className="product-main" aria-label="Product details">
          <div className="product-gallery">
            <div className="product-image-stage">
              <span className="product-badge">Featured</span>
              <Image
                src={product.image}
                alt={product.name}
                width={900}
                height={900}
                priority
                className="product-image"
              />
            </div>
          </div>

          <div className="product-summary">
            <span className="product-brand">{product.brand}</span>
            <h1 className="product-name">{product.name}</h1>

            <div className="product-price-row">
              <span className="product-price">{formatPrice(product.price)}</span>
              <span className="product-price-note">In Stock</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-info-block" aria-label="Product information">
              <div className="product-info-grid">
                <div className="info-item">
                  <span className="info-label">Brand</span>
                  <span className="info-value">{product.brand}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Price</span>
                  <span className="info-value">{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>

            <div className="purchase-actions">
              <div className="quantity-selector" role="group" aria-label="Select quantity">
                <button
                  type="button"
                  className="quantity-button"
                  aria-label="Decrease quantity"
                  onClick={decreaseQuantity}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  type="button"
                  className="quantity-button"
                  aria-label="Increase quantity"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              <button type="button" className="btn" onClick={handleAddToCart}>
                <strong>Add to Cart</strong>
                <div className="container-stars">
                  <div className="stars"></div>
                </div>
                <div className="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>

              <button
                type="button"
                className="wishlist-button"
                aria-label="Add to wishlist"
              >
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="product-feature-grid" aria-label="Product highlights">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <div className="feature-copy">
                <span className="feature-title">{feature.title}</span>
                <span className="feature-text">{feature.text}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="detail-section" aria-label="Product details and story">
          <h2 className="section-heading">Why You&apos;ll Love It</h2>
          <div className="detail-copy">
            <p>{product.description}</p>
            <p>
              Built for a premium everyday look, this style brings together comfort,
              quality materials, and a design that feels polished from the street to the
              store.
            </p>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-section" aria-label="Related products">
            <div className="related-head">
              <h2 className="section-heading">You May Also Like</h2>
            </div>

            <div className="related-grid">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="related-card"
                >
                  <div className="related-image-wrapper">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={480}
                      height={320}
                      className="related-image"
                    />
                  </div>

                  <div className="related-body">
                    <span className="related-brand">{relatedProduct.brand}</span>
                    <h3 className="related-name">{relatedProduct.name}</h3>

                    <div className="related-footer">
                      <span className="related-price">{formatPrice(relatedProduct.price)}</span>
                      <span className="related-link">View</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
