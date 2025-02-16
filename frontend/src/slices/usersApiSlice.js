import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //you can call all endpoints here for example getUsers, getUser, createUser, updateUser, deleteUser which are all related to users
    //First we will endpoints for login. Since we are not just fetching data but also sending data, we will use the mutation method instead of the query method. Once the login button is clicked, we will send a POST request to the /auth endpoint with the email and password in the body of the request. This will then call setCredentials from the authSlice.js to store the user's information in the state and local storage.
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

//This is a convention to export the hooks of the endpoints with use{EndpointName}Mutation
export const { useLoginMutation } = usersApiSlice;