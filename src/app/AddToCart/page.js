'use client';
import "./cart.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart,decreaseQuantity }
from "@/store/cartSlice";
import Link from "next/link";
export default function AddToCart(){

const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.cartItems);
const currentUser = useSelector((state)=> state.auth.user);


const saveCartToDB = async ()=>{
  try{

    const response = await fetch("/api/cart", {
      method : "POST",
      headers:{
      "Content-Type" : "application/json",
       },
      body : JSON.stringify({
        userId : currentUser?._id,
        items : cartItems,
      }), 
    });

    const data = await response.json();
    console.log("Cart saved to DB : ",data);

  }catch(error){
console.error("Error saving cart to DB : ",error);
  }
}

useEffect(() => {

  console.log("CART USE EFFECT RUNNING");
  console.log("USER ID:", currentUser?._id);
  console.log("CART ITEMS:", cartItems);

  if (currentUser?._id && cartItems.length > 0) {
    saveCartToDB();
  }
}, [currentUser, cartItems]);

// const dispatch = useDispatch();
// const {cartItems} = useSelector((state) => state.cart);

const grandTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity , 0
);
return(<>
    
    <div className="cart-page">

  <div className="cart-header">
    {/* <span className="logo-name">SOLEVO</span> */}
     {/* <span className="logo-slogan">Step Into Style</span> */}
    <p>3 products</p>
  </div>

  <div className="cart-container">

    {/* Left Side */}
    <div className="cart-items">
      {cartItems.map((product) => (
      <div className="cart-item" key={product.id}>
        <img src={product.image} alt={product.name} />

        <div className="item-info">
          <h3>{product.name}</h3>
        </div>

        <div className="quantity-box">
          <button onClick={()=>dispatch(decreaseQuantity(product.id))}>
            -
          </button>
          <span>{product.quantity}</span>
          <button onClick={()=>dispatch(addToCart(product))}>
            +
            </button>
        </div>

        <div className="item-price">{product.price}</div>

        <button
        onClick={()=>dispatch(removeFromCart(product.id))}
         className="delete-btn">
          ×
          </button>
      </div>
))}
    </div>

    {/* Right Side */}
    <div className="order-summary">

      <h2>Order Summary</h2>

      {/* <div className="promo-box">
        <input
          type="text"
          placeholder="Promo Code"
        />
        <button>Apply</button>
      </div> */}

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{grandTotal}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>$20</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>{grandTotal}</span>
      </div>
      <Link   href="/ShippingAddress">
      <button className="checkout-btn">
        Continue To Checkout
      </button>
   </Link>
    </div>

  </div>

  {/* Bottom Banner */}
  <div className="cart-banner">
    <img src="/assets/banner.jpg" alt="" />
  </div>

</div>

    </>)
}







