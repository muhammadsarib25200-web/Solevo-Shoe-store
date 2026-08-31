import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice'
import authReducer from "./authSlice"
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import shippingReducer from "./shippingSlice";
export const store = configureStore({

    reducer:{
      products : productsReducer,
      auth : authReducer,
      wishlist: wishlistReducer,
      cart : cartReducer,
      shipping : shippingReducer,
    },
});
