import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

// We will now create a new slice called ordersApiSlice. This slice will be used to make requests to the /api/orders endpoint. 
// We will use the createOrder endpoint to create a new order. The createOrder endpoint will send a POST request to the /api/orders endpoint with the order data. The order data will be sent in the request body. The createOrder endpoint will return the order data which is a spread of the order data in the request body.
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: {...order},
      }),
    }),
    //Here we are creating a new endpoint called getOrderDetails. This endpoint will be used to get the order details from the API. The getOrderDetails endpoint will send a GET request to the /api/orders/:id endpoint with the order ID. The order ID will be passed as a parameter to the query function. The getOrderDetails endpoint will return the order details.
    //We will also set the keepUnusedDataFor property to 5 seconds. This will keep the data in the cache for 5 seconds after the component that uses this endpoint is unmounted. This is useful when we want to refetch the data after a certain amount of time.
    //We will also set the query function to return an object with the url and method properties. The url property will be the /api/orders/:id endpoint and the method property will be GET. The order ID will be passed as a parameter to the query function. The getOrderDetails endpoint will return the order details.
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    //Here we are creating a new endpoint called payOrder. This endpoint will be used to pay for the order. The payOrder endpoint will send a PUT request to the /api/orders/:id/pay endpoint with the order ID and payment details. The order ID will be passed as a parameter to the query function. The payOrder endpoint will return the order details.
    //We will also set the query function to return an object with the url and method properties. The url property will be the /api/orders/:id/pay endpoint and the method property will be PUT. The order ID will be passed as a parameter to the query function. The payOrder endpoint will return the order details.
    payOrder: builder.mutation({
      query: (orderID, details) => ({
        url: `${ORDERS_URL}/${orderID}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    //Here we are creating a new endpoint called getPayPalClientId. This endpoint will be used to get the PayPal client ID from the API. The getPayPalClientId endpoint will send a GET request to the PAYPAL_URL endpoint. The getPayPalClientId endpoint will return the PayPal client ID.
    //We will also set the keepUnusedDataFor property to 5 seconds. This will keep the data in the cache for 5 seconds after the component that uses this endpoint is unmounted. This is useful when we want to refetch the data after a certain amount of time.
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// We will now export the useCreateOrderMutation hook. This hook will be used to create a new order. The useCreateOrderMutation hook will return a tuple with an object and a function. The object will contain the status of the mutation and the data returned by the mutation. The function will be used to trigger the mutation. The useCreateOrderMutation hook will be used in the OrderScreen component to create a new order.
export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } = ordersApiSlice;
