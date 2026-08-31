"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
        shippingAdress: {
        fullName : "",
        address : "",
        city : "",
        phone : "",
        postalCode : "",
        contry:"",
    },
};

const shippingSlice = createSlice({
    name :"shipping",
    initialState,
    reducers : {
       saveShippingAddress : (state, action) => {
            state.shippingAdress = action.payload;
        },

        clearShippingAdress : (state) => {
            state.shippingAdress = initialState.shippingAdress;
        }
    }
})


export const {saveShippingAddress, clearShippingAdress} = shippingSlice.actions;
export default shippingSlice.reducer;