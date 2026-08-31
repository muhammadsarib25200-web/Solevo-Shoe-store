"use client";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import "./wishlist.css";

export default function WishlistPage() {
  const wishListItems = useSelector(
    (state) => state.wishlist.items
  );

  const dispatch = useDispatch();

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Save your favorite shoes and find them anytime.</p>
      </div>

      <div className="wishlist-grid">
        {wishListItems.map((product) => (
          <div className="wishlist-shoe-card" key={product.id}>

            <div className="wishlist-image-container">

              <span className="wishlist-product-badge">
                {product.badge || "New"}
              </span>

              <button
                type="button"
                className="wishlist-remove-button"
                onClick={() => dispatch(removeFromWishlist(product.id))}
                aria-label="Remove product from wishlist"
              >
                ♥
              </button>

              <Image
                src={product.image}
                alt={product.title || "Running shoe"}
                width={320}
                height={250}
                className="wishlist-shoe-image"
                loading="eager"
              />

            </div>

            <div className="wishlist-card-content">

              <div className="wishlist-category-rating">

                <span className="wishlist-product-category">
                  {product.name || "Running Shoes"}
                </span>

                <span className="wishlist-product-rating">
                  ★ {product.rating || "4.8"}
                </span>

              </div>

              <h3 className="wishlist-product-title">
                {product.title}
              </h3>

              {product.description && (
                <p className="wishlist-product-description">
                  {product.description}
                </p>
              )}

              <div className="wishlist-product-footer">

                <div className="wishlist-price-box">

                  <span className="wishlist-price-label">
                    Price
                  </span>

                  <strong className="wishlist-product-price">
                    ${product.price}
                  </strong>

                </div>

                <button
                  type="button"
                  className="wishlist-cart-button"
                >
                  <span className="wishlist-cart-icon">🛒</span>
                  Add to Cart
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}