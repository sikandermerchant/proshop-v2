import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; // useSelector is a hook to extract data from the Redux store state, using a selector function. In this case, we are using it to get the cart state from the Redux store. useDispatch is a hook to dispatch actions to the Redux store. We will use it to dispatch the logout action from the authSlice.js when the user clicks on the logout button in the dropdown menu in the Navbar.
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png';



const Header = () => { 
  //using the useSelector hook to get the cart state from the Redux store. Here we have destructured the cartItems from the state so we can use it directly in the component. The cart in state.cart refers to the cart slice in the Redux store which we can see in our store.js file where there is a reducer for the cart slice which is cartSliceReducer and that is what we are accessing here. We can access any of cartItems like shippingAddress, paymentMethod, etc. from the cart state.
  const { cartItems } = useSelector(state => state.cart); //get the cart state from the Redux store using the useSelector hook
  const { userInfo } = useSelector(state => state.auth); //get the user info from the Redux store using the useSelector hook
  //we will get the userInfo from the Redux store using the useSelector hook. We will use this to display the user's name in the Navbar. We will also use this to display the user's name in the dropdown menu in the Navbar. We will use the userInfo object to get the user's name. userInfo will contain the user's information. If the user is already logged in, userInfo will be an object with the user's information. If the user is not logged in, userInfo will be null. You can see this in the redux dev tools.
  //This console.log statement will log the cartItems to the console whenever the Header component is rendered
  console.log(cartItems)
  //Now that we have the cartItems from the Redux store, we can use it to display the number of items in the cart in the Navbar. We can do this by using the length property of the cartItems array. We will display the number of items in the cart in the Navbar by adding a Badge which is a small circle with the number of items in the cart available in React Bootstrap. This will be done in the Cart Nav.Link in the Navbar.
  // As we can see using conditional rendering, we are checking if the length of the cartItems array is greater than 0 and if it is, we are displaying a span with the class badge and the number of items in the cartItems array. This will display the number of items in the cart in the Navbar. If 0 items are in the cart, the badge will not be displayed.
  //We will also create a logoutHandler function that will dispatch the logout action from the authSlice.js. This will remove the user's information from the state and local storage. We will call this function when the user clicks on the logout button in the dropdown menu in the Navbar.

  const dispatch = useDispatch(); //use the useDispatch hook to dispatch actions to the Redux store
  const navigate = useNavigate(); //use the useNavigate hook to navigate to different pages in our application
  //The useLogoutMutation hook will return an array with the logout function. We will destructure the logout function from the array. The logout function will send a POST request to the /logout endpoint. This will destroy the cookie in the backend server. We will call this function when the user clicks on the logout button in the dropdown menu in the Navbar.
  const [logoutUser] = useLogoutMutation(); //call the useLogoutMutation hook to get the logout function
  //The logout handler will be async and will call the logout function from the usersApiSlice.js. This will send a POST request to the /logout endpoint. This will destroy the cookie in the backend server. We will then dispatch the logout action from the authSlice.js to remove the user's information from the state and local storage. We will call this function when the user clicks on the logout button in the dropdown menu in the Navbar.
  const logoutHandler = async () => {
    //for now we will just console.log logout
    console.log('logout')
    try {
      //When the user clicks on the logout button in the dropdown menu in the Navbar, we will call logoutUser from the usersApiSlice.js. logoutUser is a function that will send a POST request to the /logout endpoint. This will destroy the cookie in the backend server. We will then await the response from the logoutUser function. The response will be empty. We will then dispatch the logout action from the authSlice.js to remove the user's information from the state and local storage. We will call this function when the user clicks on the logout button in the dropdown menu in the Navbar.
      //Since it returns a promise, we will await the response from the logoutUser function. The response will be empty. We will then dispatch the logout action from the authSlice.js to remove the user's information from the state and local storage. The unwrap function is always used with the async/await syntax. It will return the data from the response if the request is successful. If the request is unsuccessful, it will throw an error. We will use this to get the data from the response of the logoutUser function.
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt="ProShop" width="50" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {
                    cartItems.length > 0 &&
                    (
                      <Badge
                        pill
                        bg="success"
                        margin-left="5px">
                        {
                          //Here we are using a commonly used JS reduce method to get the total quantity of items in the cartItems array. The reduce() method reduces an array to a single value. This method executes provided function for each value of the array (from left-to-right). The return value of the function is stored in an accumulator (result/total). The reduce() method does not reduce the original array. The reduce() method can be used to find the sum of all the elements in an array.

                          // The reduce method takes a callback function and an initial value. Example - 
                          // array.reduce((accumulator, currentValue) => { /* ... */ }, initialValue)
                          //accumulator: A value that accumulates the result of the callback function. It starts with initialValue and is updated with each iteration.
                          //currentValue: The current element being processed in the array.
                          //initialValue: An optional value to initialize the accumulator. If not provided, the first array element is used as the initial value.

                          //Here the callback function takes two arguments, the accumulator and the current item. The accumulator is the value that is returned by the callback function and is passed to the next iteration of the array. The current item is the current item in the array that is being iterated over. In this case, we are adding the quantity of the current item to the accumulator and returning the result. The initial value of the accumulator is 0. This will give us the total quantity of items in the cartItems array. This technique is useful when we want to get the total of a property in an array of objects and is a common pattern in JavaScript.
                          cartItems.reduce ((acc, item) => acc + item.qty, 0)
                        }
                      </Badge>
                    )
                  }


                </Nav.Link>
              </LinkContainer>
              {userInfo ?
                (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                  </NavDropdown>
                ):
                  (<LinkContainer to = '/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>)}
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
