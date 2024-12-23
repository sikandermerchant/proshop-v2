export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
} //function to round the number to 2 decimal places

export const updateCart = (state) => { 
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
  
  return state; //return the updated state
}
