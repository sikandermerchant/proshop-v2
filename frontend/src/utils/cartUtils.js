//In this cartUtil we will 
//1. Create a function addDecimals to round the number to 2 decimal places
//2. Create a function updateCart to calculate the item price, shipping price, tax price, and total price of the cart

//In the addDecimals function, we take a number as a parameter and return the number rounded to 2 decimal places. We multiply the number by 100, round it to the nearest whole number, and then divide it by 100 to get the number rounded to 2 decimal places.
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
} //function to round the number to 2 decimal places

//In the updateCart function, we take the state as a parameter and calculate the item price, shipping price, tax price, and total price of the cart. 
// We calculate the item price by using the reduce function to calculate the total price of the cart, the shipping price is 0 if the total price is greater than 100, else it is 10, the tax price is 15% of the total price, and the total price is the sum of the item price, shipping price, and tax price. We also use the addDecimals function to round the total price to 2 decimal places. 
// We then save the cart to the local storage and return the updated state.
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
