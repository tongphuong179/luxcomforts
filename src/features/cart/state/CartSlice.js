import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.product = action.payload;
    },
    removeCart: (state) => {
      state.product = null;
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
