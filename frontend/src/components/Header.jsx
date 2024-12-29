import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector} from 'react-redux'; // useSelector is a hook to extract data from the Redux store state, using a selector function. In this case, we are using it to get the cart state from the Redux store.
import logo from '../assets/logo.png';

const Header = () => { 
  //using the useSelector hook to get the cart state from the Redux store. Here we have destructured the cartItems from the state so we can use it directly in the component. The cart in state.cart refers to the cart slice in the Redux store which we can see in our store.js file where there is a reducer for the cart slice which is cartSliceReducer and that is what we are accessing here. We can access any of cartItems like shippingAddress, paymentMethod, etc. from the cart state.
  const { cartItems } = useSelector(state => state.cart); //get the cart state from the Redux store using the useSelector hook
  //This console.log statement will log the cartItems to the console whenever the Header component is rendered
  console.log(cartItems)
  //Now that we have the cartItems from the Redux store, we can use it to display the number of items in the cart in the Navbar. We can do this by using the length property of the cartItems array. We will display the number of items in the cart in the Navbar by adding a Badge which is a small circle with the number of items in the cart available in React Bootstrap. This will be done in the Cart Nav.Link in the Navbar.
  // As we can see using conditional rendering, we are checking if the length of the cartItems array is greater than 0 and if it is, we are displaying a span with the class badge and the number of items in the cartItems array. This will display the number of items in the cart in the Navbar. If 0 items are in the cart, the badge will not be displayed.
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
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
