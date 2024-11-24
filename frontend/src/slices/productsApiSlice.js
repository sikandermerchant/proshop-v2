import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //you can call all endpoints here for example getProducts, getProduct, createProduct, updateProduct, deleteProduct which are all related to products
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      // keepUnusedDataFor is used to keep the data in the cache for a certain amount of time in the RTK Query cache. The value is in seconds.
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5, 
    }),
  }),
});

//This is a convention to export the hooks of the endpoints with use{EndpointName}Query
export const { useGetProductsQuery, useGetProductDetailsQuery  } = productsApiSlice;