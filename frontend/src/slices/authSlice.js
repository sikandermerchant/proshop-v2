//In this slice we won't be calling the users API. That will go into another slice called usersApiSlice.js. This slice will only be responsible for handling the authentication state of the user and storing the token in the local storage.
//First we will import createSlice from @reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit';
//Lets create our initial state. Here we have a userInfo object that will store the user's information. We will get the user's information from the local storage if it exists. If it does exist, we will parse it as a JSON object and store it in the userInfo object. If it doesn't exist, we will set it to null.
const initialState = {
  userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
}

//Next we will create our slice. We will call it authSlice and pass in the initial state and an object with the name, reducers, and extraReducers properties.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //We will create a reducer called setCredentials. This reducer will take in the state and an action. The action will have a payload that will contain the user's information. We will set the userInfo object in the state to the payload and store it in the local storage as a JSON string. Once the user logs in, he will first call login from the usersApiSlice.js which will return the user's information and token. We will then call setCredentials with the user's information to store it in the state and local storage. The token will not be stored in the local storage as it is not needed in the frontend. It will be sent in the headers of the requests to the backend.
    // and then dispatch setCredentials with the user's information.
    setCredentials: (state, action) => { 
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    //Here we will add the reducer for logout. This reducer will take in the state and set the userInfo object to null. We will also remove the user's information from the local storage. We will call this reducer when the user logs out. We will first call logout from the usersApiSlice.js which will send a POST request to the /logout endpoint. This will destroy the cookie in the backend server. We will then call the logout action from the authSlice.js to remove the user's information from the state and local storage.
    //So this is for the localstorage and the state. While the logout function in the usersApiSlice.js is for the backend server.
    //We will import both this and the logout function from the usersApiSlice.js in the Header component and call the logout function when the user clicks on the logout button in the dropdown menu in the Navbar.
    logout: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = undefined; // ✅ Clears all Redux state
      });
    
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();  // ✅ Ensures UI updates fully
    }
    
  }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;