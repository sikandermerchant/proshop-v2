import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//Create an initial state for the cart to check if there is a cart in the local storage, if not, set the cart to an empty array and if there is a cart in the local storage, set the cart to the cart in the local storage with JSON.parse to convert the string to an object. The cart here is an object with cartItems as an array. CartItems is an array of items in the cart which has the product information.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

//moved to utils.js
// const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// } //function to round the number to 2 decimal places

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
      //moved to utils.js
      //  //Calculate the item price
      //  state.itemsPrice = addDecimals(state.cartItems.reduce((a, item) => a + item.price * item.qty, 0)); //Calculate the total price of the cart using reduce where a is the accumulator and the item is the current item
      //  //Calculate the Shipping price
      //  state.shippingPrice =addDecimals(state.itemsPrice > 100 ? (0) : (10)); //if the total price is greater than 100, the shipping price is 0, else it is 10
 
      //  //Calculate the tax price
      //  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2))); //Calculate the tax price which is 15% of the total price
      //  //Calculate the total price of the cart
      //  state.totalPrice = (Number(state.itemsPrice) +
      //    Number(state.shippingPrice) +
      //    Number(state.taxPrice)
      //  ).toFixed(2); //Calculate the total price of the cart
      //  localStorage.setItem("cart", JSON.stringify(state)); //save the cart to local storage
      return updateCart(state); //return the updated state
    },
  }
})

//Export the addToCart function
export const { addToCart } = cartSlice.actions;
//Export the cart reducer which will be used in the store to update the state every time the addToCart function is called. This reducer will update the state of the cart with the new item added to the cart and is a mutable operation.
export default cartSlice.reducer;