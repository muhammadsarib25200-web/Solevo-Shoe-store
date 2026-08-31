






import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addtoWishList: (state, action) => {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    setWishList : (state, action) => {
      state.items = action.payload
    },

    removeFromWishlist :(state , action) => {
      state.items = state.items.filter(
        (item => item.id !== action.payload)
      );
    },
  },
});

export const { addtoWishList, setWishList, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;