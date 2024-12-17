import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
} //function to round the number to 2 decimal places

//Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Add to cart function to add items to the cart
    addToCart: (state, action) => {
      const item = action.payload; //get the item from the action payload
      const existingItem = state.cartItems.find((x) => x._id === item._id); //if the item is already in the cart, update the quantity
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existingItem._id ? item : x); //if the item is already in the cart, update the quantity
      } else {
        state.cartItems = [...state.cartItems, item];//if the item is not in the cart, add it to the cart
      }
      //Calculate the item price 
      state.itemsPrice = addDecimals(state.cartItems.reduce((a, item) => a + item.price * item.qty, 0)); //Calculate the total price of the cart using reduce where a is the accumulator and the item is the current item
      //Calculate the Shipping price
      state.shippingPrice =addDecimals(state.itemsPrice > 100 ? (0) : (10)); //if the total price is greater than 100, the shipping price is 0, else it is 10

      //Calculate the tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2))); //Calculate the tax price which is 15% of the total price
      //Calculate the total price of the cart
      state.totalPrice = (Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2); //Calculate the total price of the cart
      localStorage.setItem("cart", JSON.stringify(state)); //save the cart to local storage
    },
  }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;