"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import "./orderConfirmation.css";

const SHIPPING_CHARGES = 20;

function formatPrice(value) {
  return `$${Number(value).toLocaleString()}`;
}

export default function OrderConfirmation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth.user);

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const shippingCharges = cartItems.length > 0 ? SHIPPING_CHARGES : 0;
  const grandTotal = subtotal + shippingCharges;

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">
        <header className="confirmation-header">
          <p className="confirmation-eyebrow">Order confirmed</p>
          <h1>Thank you, {currentUser?.name || "Customer"}</h1>
          <p>Your order summary is ready below.</p>
        </header>

        {cartItems.length === 0 ? (
          <section className="empty-order">
            <h2>Your cart is empty</h2>
            <p>Add products to your cart to view an order bill.</p>
            <Link className="back-to-shop" href="/AllProducts">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <section className="bill-card" aria-label="Order bill">
            <div className="bill-items">
              <h2>Order Summary</h2>
              {cartItems.map((item) => (
                <article className="bill-item" key={item.id}>
                  <img src={item.image} alt={item.title || item.name} />
                  <div className="bill-item-details">
                    <h3>{item.title || item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="bill-item-price">
                    <span>{formatPrice(item.price)} each</span>
                    <strong>{formatPrice(Number(item.price) * item.quantity)}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="bill-total">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="bill-row">
                <span>Shipping Charges</span>
                <span>{formatPrice(shippingCharges)}</span>
              </div>
              <div className="bill-row bill-grand-total">
                <span>Grand Total</span>
                <strong>{formatPrice(grandTotal)}</strong>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}