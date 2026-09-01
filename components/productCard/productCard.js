



"use client";
import Link from "next/link";
import Image from "next/image";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addtoWishList } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
export default function ProductCard({ product, showDescription, cartBtn, style }) {

  const isLoggedIn = useSelector((state) => state.auth.isLogginIn);

    function handleAddToCart() {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }

    dispatch(addToCart(product));
    window.dispatchEvent(new CustomEvent("cart:item-added", { detail: product.name }));
  };

  function addToWishlist() {
    console.log("Added to wishlist:", product);
  }

  const dispatch = useDispatch();
  return (
    <Link className="product-card-link" href={`/product/${product.id}`}>
  
    <div className="shoe-card" style={style}>

      {/* Product image section */}
      <div className="shoe-image-container">

        <span className="product-badge">
          {product.badge || "New"}
        </span>

        {/* <button
          type="button"
          className="wishlist-button"
          // onClick={() => dispatch(addtoWishList(product))}
           onClick={() => {
    console.log(product);
    dispatch(addtoWishList(product));
  }}
          aria-label="Add product to wishlist"
        >
          ♡
        </button> */}


        <button
  type="button"
  className="wishlist-button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addtoWishList(product));
  }}
  aria-label="Add product to wishlist"
>
  ♡
</button>

        <Image
          src={product.image}
          alt={"Running shoe"}
          width={320}
          height={250}
          className="shoe-image"
        />
      </div>

      {/* Product details */}
      <div className="shoe-card-content">

        <div className="category-rating">
          <span className="product-category">
            {product.name || "Running Shoes"}
          </span>

          <span className="product-rating">
            ★ {product.rating || "4.8"}
          </span>
        </div>

        <h3 className="product-title">
          {product.title}
        </h3>
{showDescription &&
        <p className="product-description">
          {product.description}
        </p>
}

        {/* <div className="color-section">
          <span>Colors</span>

          <div className="color-options">
            <button className="color color-black"></button>
            <button className="color color-orange"></button>
            <button className="color color-gray"></button>
          </div>
        </div> */}

        <div className="product-footer">

          <div className="price-box">
            <span className="price-label">Price</span>

            <strong className="product-price">
              ${product.price}
            </strong>
          </div>
     {cartBtn &&
          <button
            type="button"
            className="cart-button"
            onClick={(e)=>{
            handleAddToCart();
            e.preventDefault();
            e.stopPropagation();
            }}
          >
            <span className="cart-icon">🛒</span>
            Add to Cart
          </button>
}
        </div>
      </div>
    </div>
</Link>
  );
}
