'use Client';
import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    cartItems : [],
};

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{
    addToCart :  (state, action) => {
  const product = action.payload;
  
  const existingItem = state.cartItems.find(
      (item) => item.id === product.id
    );

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        state.cartItems.push({...product, quantity : 1});
    }
},

   removeFromCart : (state, action) =>{
    const id = action.payload;
    state.cartItems = state.cartItems.filter((item) => item.id !== id);
   },
 
   decreaseQuantity : (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id)
      
      if(existingItem){
          if(existingItem.quantity === 1){
              state.cartItems = state.cartItems.filter((item) => item.id !== id)
            }else{
                existingItem.quantity -= 1;
            }
        }
    },


    clearCart: (state) => {
        state.cartItems = [];
    }
    }
})

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
