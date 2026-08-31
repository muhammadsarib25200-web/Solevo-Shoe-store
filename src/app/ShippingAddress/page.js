// "use client";

// import "./ShippingAddress.css";
// import {useDispatch} from "react-redux";
// import { useState } from "react";
// import {saveShippingAddress} from "@/store/shippingSlice";
// // import shippingAddress from "@/models/order"
// import { useRouter } from "next/navigation";
// import { clearCart } from "@/store/cartSlice";
// export function ShippingAddress() {

//   const handleConfirmOrder = async ()=> {
//     try{
//        const response = await fetch("/api/order", {
//         method : "POST",
//         headers : {
//          "Content-Type" : "application/json",
//         },
//       body: JSON.stringify({

//         userId : currentUser._id,
//         customerName: currentUser.name,
//         customerEmail: currentUser.email,

//         shippingAddress,
//         items: cartItems,
//         subtotal:grandTotal,
//         total:grandTotal + 20,

//       }),
//        });

//        const data = await response.json();
//        console.log("ORDER RESPONSE", data);

//        if(data.success){
//         alert("Order placed successfully!");
//        }else{
//         alert(data.message);
//        }
//        if (data.success) {
//   dispatch(clearCart());

//   router.push("/OrderSuccess");
// }

//     }catch(error){
//     console.error("ODERED ERROR", error);
//     }
// };
//      const dispatch = useDispatch();
//   const router = useRouter();
//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         address: "",   
//         city: "",
//         postalCode: "",
//         country: "",             
//     });

//     const handleChange = (e) =>{
//         const {name, value} = e.target;
//         setFormData((prevData) =>({
//             ...prevData,
//             [name] : value,
//         }))
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch( saveShippingAddress(formData));
//         router.push("/OrderConfirmation");
//     }


//   return (
//     <div className="shipping-page">
//       <div className="shipping-container">

//         <div className="shipping-header">
//           <h1>Shipping Details</h1>
//           <p>Enter your delivery information to continue with your order.</p>
//         </div>

//         <div className="shipping-content">

//           <form className="shipping-form" onSubmit={handleSubmit}>
//                e.pr
//             <div className="form-section">
//               <h2>Delivery Information</h2>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="fullName">Full Name</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     name="phone"
//                     placeholder="03XX XXXXXXX"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="address">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                     onChange={handleChange}
//                   placeholder="House no, street, area"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="city">City</label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="Enter your city"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="postalCode">Postal Code</label>
//                   <input
//                     type="text"
//                     id="postalCode"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     placeholder="Enter postal code"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="country">Country</label>
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   value={formData.country}
//                     onChange={handleChange}
//                   placeholder="Enter your country"
//                 />
//               </div>
//             </div>

//             <div className="shipping-actions">
//               <button onClick={handleConfirmOrder} type="submit" className="continue-btn">
//                 Confirm Order
//               </button>
//             </div>

//           </form>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingAddress;



"use client";

import "./ShippingAddress.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShippingAddress } from "@/store/shippingSlice";
import { useRouter } from "next/navigation";
import { clearCart } from "@/store/cartSlice";

export function ShippingAddress() {

  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const shippingAddress = useSelector(
    (state) => state.shipping.shippingAddress
  );

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async (address) => {
    try {

      if (!currentUser?._id) {
        alert("User information not found. Please login again.");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      console.log("USER:", currentUser);
      console.log("USER ID:", currentUser._id);
      console.log("CART ITEMS:", cartItems);
      console.log("SHIPPING ADDRESS:", address);
      console.log("TOTAL:", grandTotal);

      const response = await fetch("/api/order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          userId: currentUser._id,

          customerName: currentUser.name,

          customerEmail: currentUser.email,

          shippingAddress: address,

          items: cartItems,

          subtotal: grandTotal,
           shippingFee: 200,
          total: grandTotal +  200,

        }),
      });

      const data = await response.json();

      console.log("ORDER RESPONSE:", data);

      if (data.success) {

        alert("Order placed successfully!");

        // Cart clear
        dispatch(clearCart());

        // Bill / Order success page
        router.push("/OrderConfirmation");

      } else {

        alert(data.message || "Order could not be placed.");

      }

    } catch (error) {

      console.error("ORDER ERROR:", error);

      alert("Something went wrong while placing the order.");

    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Shipping address Redux me save
    dispatch(saveShippingAddress(formData));

    // Same address directly API ko bhejo
    // Redux update ka wait karne ki zaroorat nahi
    await handleConfirmOrder(formData);
  };

  return (
    <div className="shipping-page">

      <div className="shipping-container">

        <div className="shipping-header">

          <h1>Shipping Details</h1>

          <p>
            Enter your delivery information to continue with your order.
          </p>

        </div>

        <div className="shipping-content">

          <form
            className="shipping-form"
            onSubmit={handleSubmit}
          >

            <div className="form-section">

              <h2>Delivery Information</h2>

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label htmlFor="address">
                  Address
                </label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no, street, area"
                  required
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="postalCode">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label htmlFor="country">
                  Country
                </label>

                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  required
                />

              </div>

            </div>

            <div className="shipping-actions">

              <button
                type="submit"
                className="continue-btn"
              >
                Confirm Order
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ShippingAddress;