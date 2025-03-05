import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'


const LoginScreen = () => {
  //Lets create a component level state for the email and password. We will use the useState hook to create these states. We will set the initial value of the email and password to an empty string.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Here we will create dispatch and navigate variables using the useDispatch and useNavigate hooks respectively.
  //useDispatch is a hook that returns a reference to the dispatch function from the Redux store. We will use this to dispatch actions to the store.
  //useNavigate is a hook that returns a navigate function. We will use this to navigate to different pages in our application.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Here we are calling login from the usersApiSlice.js and storing it in the login variable. login is a function that will send a POST request to the /auth endpoint with the email and password in the body of the request. We will call this function when the form is submitted. 
  //we are also calling isLoading from the login object. isLoading will be true when the request is being sent and false when the request is completed.
  const [login, { isLoading }] = useLoginMutation();
  //Here we are calling the userInfo from the auth slice. The destructured object will contain the user's information. 
  //By using the useSelector hook, we can access the state of the store. We will pass in a function that will take in the state as an argument and return the userInfo object from the state.
  //userInfo will contain the user's information. If the user is already logged in, userInfo will be an object with the user's information. If the user is not logged in, userInfo will be null. You can see this in the redux dev tools
  const { userInfo } = useSelector((state) => state.auth);
  //We will also have a submit handler and to begin with we will just console log the email and password when the form is submitted.
  //useLocation is a hook that returns the location object that represents the current URL. We will use this to get the query parameters from the URL.
  //Here we are getting the destructured search object from useLocation. search will contain the query parameters in the URL. We will use this to redirect the user to the page they were on before logging in.
  const { search } = useLocation();
  //Here we are using the URLSearchParams constructor to parse the search string. We will use this to get the redirect query parameter from the search object. URLSearchParams is a built-in object that allows us to work with the query string of a URL. Here we are creating a new URLSearchParams object with the search string as an argument.
  const sp = new URLSearchParams(search);
  //Finally we will get the redirect query parameter from the search object. The sp.get takes the key of the query parameter as an argument and returns the value of the query parameter. If the redirect query parameter does not exist, we will set the redirect variable to '/' i.e. the home page.
  const redirect = sp.get('redirect') || '/';
  //Here we are using the useEffect hook to check if the userInfo object is not null. If it is not null, we will redirect the user to the redirect URL. We will use the navigate function to redirect the user to the redirect URL. The dependencies of the useEffect hook are userInfo, redirect, and navigate. Thus the useEffect hook will run whenever userInfo, redirect, or navigate changes.
  useEffect(() => {
    //If userInfo is not null, we will redirect the user to the redirect URL. We will use the navigate function to redirect the user to the redirect URL.
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log('Sign In');
    try {
      //When the Sign In button is clicked, we will call login from the usersApiSlice.js with the email and password in the body of the request. We will then await the response from the login function. login is a function that will send a POST request to the /auth endpoint with the email and password in the body of the request. We will call this function when the form is submitted. The response will contain the user's information. The token will be sent in the headers of the requests to the backend.
      const res = await login({ email, password }).unwrap();
      //Once we get the response we will dispatch setCredentials with the user's information. setCredentials is a reducer from the authSlice.js that will take in the state and an action. The action will have a payload that will contain the user's information and token. We will set the userInfo object in the state to the payload and store it in the local storage as a JSON string.The token will not be stored in the local storage as it is not needed in the frontend. It will be sent in the headers of the requests to the backend. 
      //We use a spread operator to pass in the user's information as an object. This is because the unwrap function will return the user's information as an object. 
      dispatch(setCredentials({ ...res }));
      //Finally we will redirect the user to the redirect URL whether it is the home page or to the page where we were suppose to redirect the user to. We will use the navigate function to redirect the user to the redirect URL.
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader />}

        <Row className='py-3'>
          <Col>
            New Customer? {' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : 'register'}>
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen