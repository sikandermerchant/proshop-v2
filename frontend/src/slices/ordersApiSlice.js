import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

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
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// We will now export the useCreateOrderMutation hook. This hook will be used to create a new order. The useCreateOrderMutation hook will return a tuple with an object and a function. The object will contain the status of the mutation and the data returned by the mutation. The function will be used to trigger the mutation. The useCreateOrderMutation hook will be used in the OrderScreen component to create a new order.
export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;
