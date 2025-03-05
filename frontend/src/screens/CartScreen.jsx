import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../slices/cartSlice'


const CartScreen = () => {
  //Lets initialize the navigate function. Just to recap the useNavigate hook is used to navigate to a different route in the application. It is similar to the useHistory hook in React Router DOM. The navigate function can be used to navigate to a different route in the application. It is similar to the useHistory.push() method in React Router DOM.
  const navigate = useNavigate()
  //lets also initialize the dispatch function. The useDispatch hook is used to dispatch actions in Redux. The dispatch function is used to dispatch actions to the Redux store. Actions are functions that return an object with a type property that describes the action that is being performed. The dispatch function is used to dispatch these actions to the Redux store.
  const dispatch = useDispatch()
  //We have our cartItems in Local Storage and our Redux store. We want to get the cartItems from the Redux store. We can do this using the useSelector hook. The useSelector hook is used to extract data from the Redux store cart state just like we did in the Header component. We are using it to get the cart state from the Redux store. Here we have destructured the cartItems from the state so we can use it directly in the component. The cart in state.cart refers to the cart slice in the Redux store which we can see in our store.js file where there is a reducer for the cart slice which is cartSliceReducer and that is what we are accessing here. We can access any of cartItems like shippingAddress, paymentMethod, etc. from the cart state.
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)
  //Here we have created the addToCartHandler function which is an async function and takes in the product and qty as arguments. The addToCartHandler function is used to add an item to the cart. It takes the product and quantity as arguments. The product is the item that is being added to the cart. The quantity is the number of items that are being added to the cart. The addToCartHandler function dispatches an action to the Redux store to add the item to the cart. The action is the addToCart action from the cart slice. The addToCart action takes the product and quantity as arguments. The product is the item that is being added to the cart. The quantity is the number of items that are being added to the cart. The addToCart action is an action creator that returns an action object with a type property that describes the action that is being performed. The addToCart action is dispatched to the Redux store using the dispatch function. The dispatch function is used to dispatch actions to the Redux store.
  //This is a addToCartHandler function which is an async function that takes in the product and qty as arguments. The addToCartHandler function is used to add an item to the cart. It takes the product and quantity as arguments. The product is the item that is being added to the cart. The quantity is the number of items that are being added to the cart. The addToCartHandler function dispatches an action to the Redux store to add the item to the cart. The action is the addToCart action from the cart slice. The addToCart action takes the product and quantity as arguments. The product is the item that is being added to the cart. The quantity is the number of items that are being added to the cart. The addToCart action is an action creator that returns an action object with a type property that describes the action that is being performed. The addToCart action is dispatched to the Redux store using the dispatch function. The dispatch function is used to dispatch actions to the Redux store.
  const addToCartHandler = async (product,qty ) => { 
    dispatch(addToCart({...product, qty}))
  }
  //Similar to addToCartHandler function in our reducer we will have removeFromCartHandler async function which will remove the item from the cart. The removeFromCartHandler function is used to remove an item from the cart. It takes the item id as an argument. The item id is the unique identifier of the item. The removeFromCartHandler function dispatches an action to the Redux store to remove the item from the cart. The action is the removeFromCart action from the cart slice. The removeFromCart action takes the item id as an argument. The item id is the unique identifier of the item. The removeFromCart action is an action creator that returns an action object with a type property that describes the action that is being performed. The removeFromCart action is dispatched to the Redux store using the dispatch function. The dispatch function is used to dispatch actions to the Redux store.
  //We then call the removeFromCartHandler function in the onClick event of the Trash (Delete) button. The onClick event is triggered when the button is clicked. The removeFromCartHandler function is called with the item id as an argument. It is important to note that removeFromCartHandler function is called within a function otherwise it will be called immediately when the component is rendered and that will delete all the items from the cart.
  //  The item id is passed as an argument to the removeFromCartHandler function. The item id is the unique identifier of the item. The removeFromCartHandler function will remove the item from the cart.
  const removeFromCartHandler = async (id) => { 
    dispatch(removeFromCart(id))
  }

  //Similarly we will create a checkoutHandler which will be called when the Proceed to Checkout button is clicked. The checkoutHandler function is used to navigate to the shipping page. 
  //When the button is clicked it will take us to the shipping page but if the user is not logged it will take them to the login page.
  //For this we will use the useNavigate hook from React Router DOM. The useNavigate hook is used to navigate to a different route in the application. It is similar to the useHistory hook in React Router DOM. The navigate function can be used to navigate to a different route in the application. It is similar to the useHistory.push() method in React Router DOM.
  //When onClick event is triggered, the checkoutHandler is called which in turn calls the navigate function with the argument '/login?redirect=shipping'.
  //In the quotes we have the path to the login page with the query parameter redirect set to shipping. The query parameter redirect is used to redirect the user to the shipping page after they log in. The navigate function is used to navigate to a different route in the application. In this case, we are navigating to the login page with the query parameter redirect set to shipping.
  const userInfo = useSelector((state) => state.userLogin?.userInfo); // Extract user info from Redux store
  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=shipping'); // Redirect to login page with redirect param
    } else {
      navigate('/shipping'); // Redirect to shipping page if user is authenticated
    }
  };

  //What we will return in the CartScreen component is a list of items in the cart. We will display the items in a Card component. We will display the image, name, price, quantity, and subtotal of each item in the cart. We will also display the total price of all the items in the cart. We will also add a button to remove an item from the cart. If there are no items in the cart, we will display a message saying the cart is empty.
  return (
    <div>
      <Link className='btn btn-light my-3'
        to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: '20px' }}>
            Shopping Cart
          </h1>
            {
            //Here we are using conditional rendering to check if there are items in the cart. If there are no items in the cart, we will display a message saying the cart is empty. If there are items in the cart, we will display the items in the cart. The flush variant removes the border around the list group.
            //We then map through the cartItems array and display each item in the cart in a ListGroup.Item component. The ListGroup.Item component is used to display items in a list group. ListGroup.Item is a child component of the ListGroup component in React Bootstrap. It is similar to the ListGroup component but is used to display individual items in a list group. Each ListGroup.Item component has a key attribute which is set to the item id. This is used to uniquely identify each item in the list group.
            //We will then have multiple Rows for each cart item.
            //Each row will have columns for the image, name, price, quantity, and subtotal of the item.
            // We will use the Col component from React Bootstrap to create columns in the row. The Col component is used to create columns in a row. It is a child component of the Row component in React Bootstrap. The md attribute is used to set the width of the column on medium devices. In this case, we are setting the width of the column to 2 which is 2/12 of the row width. This will make the column take up 2/12 of the row width on medium devices. The Col component takes a size attribute which is used to set the width of the column. The size attribute can be set to a number between 1 and 12. The number represents the number of columns the column should take up in the row. In this case, we are setting the size attribute to 2 which means the column will take up 2 columns in the row. The size attribute can also be set to an object with properties for different screen sizes. In this case, we are setting the md property to 2 which means the column will take up 2 columns in the row on medium devices.
            // The Col component also takes a children attribute which is used to render the content of the column. In this case, we are rendering an Image component in the column. The Image component is used to display images in React Bootstrap. It is a child component of the Col component. The src attribute is used to set the source of the image. The source of the image is the item image. The alt attribute is used to set the alt text of the image. The alt text of the image is the item name. The fluid attribute makes the image responsive. The rounded attribute rounds the corners of the image.
            //The next Col component will display the name of the item. We will use the Link component from React Router DOM to link to the product page of the item. The Link component is used to create links in React Router DOM. It is similar to the anchor tag in HTML. The to attribute is used to set the URL the link should navigate to. In this case, we are setting the to attribute to the product page of the item. The link to the product page of the item is /product/ followed by the item id. The item id is the unique identifier of the item. The item name is displayed in the link within a set of parentheses. The backticks are used to interpolate the item name into the link. This technique is used to create dynamic links in React Router DOM and is similar to string interpolation in JavaScript.
            // The children attribute is used to render the content of the link. In this case, we are rendering the item name in the link.

            //The next Col component will display the price of the item. This Col has a width of 2 columns on medium devices. The price of the item is displayed in the column. A dollar sign is displayed before the price of the item.

            //The next Col component will display the quantity of the item.
            // <Col md={2}>
            // This is a Bootstrap column component. It specifies that this dropdown will take up 2 columns in a grid system when viewed on medium-sized devices (and larger).
            //<Form.Control as='select'>
            // This is a Bootstrap form component used as a dropdown (as='select').
            // The value of the dropdown is controlled by item.qty, which represents the currently selected quantity for the item.
            // The onChange event updates the quantity in the Redux store when the user selects a different value from the dropdown.
            //onChange Handler
            // javascript
            // onChange={(e) =>
            //   dispatch(addToCart(item._id, Number(e.target.value)))
            // }
            // Event Handling:
            // When the dropdown value changes (user selects a new quantity), this function is triggered.
            // e.target.value: Represents the selected quantity as a string.
            // Number(e.target.value): Converts the selected quantity to a number.
            // Dispatching Action:
            // The dispatch function sends an action (addToCart) to the Redux store.
            // addToCart(item._id, Number(e.target.value)):
            // item._id: Identifies which item's quantity is being updated.
            // Number(e.target.value): Specifies the new quantity.
            // Array Mapping
            // {[...Array(item.countInStock).keys()].map((x) => (
            //   <option key={x + 1} value={x + 1}>
            //     {x + 1}
            //   </option>
            // ))}
            // Array(item.countInStock):
            // Creates an empty array with item.countInStock elements.
            // For example, if item.countInStock is 5, this creates [undefined, undefined, undefined, undefined, undefined].
            // .keys():
            // Returns an array iterator of the indices [0, 1, 2, 3, 4].
            // ... Spread Operator:
            // Converts the iterator into an array [0, 1, 2, 3, 4].
            // Mapping Over Array
            // javascript
            // Copy code
            // map((x) => (
            //   <option key={x + 1} value={x + 1}>
            //     {x + 1}
            //   </option>
            // ))
            // Purpose:
            // Creates an array of <option> elements for the dropdown.
            // Each <option> represents a possible quantity (from 1 to countInStock).
            // Details:
            // x + 1: Ensures the dropdown starts at 1 instead of 0.
            // <option> attributes:
            // key={x + 1}: Unique identifier for React rendering.
            // value={x + 1}: Sets the value sent to the onChange handler when selected.
            // x + 1 inside the <option>: The visible text for the dropdown.
            //Overall Functionality
            // The dropdown allows users to select a quantity for an item in their cart.
            // The options range from 1 to item.countInStock.
            // Selecting a new quantity dispatches an addToCart action with the item's ID and the selected quantity, updating the Redux store.
            //To understand dispatch action further in this case please refer to section 'How dispatch Works' on https://chatgpt.com/g/g-p-677373cfe2f481919e59c696792ee3fb-reactjs/c/677a7dfc-66f0-8012-8433-cf6c68960fee
            //The last Col will be button to remove the item from the cart. We will use the FaTrash icon from react-icons/fa to display a trash icon. The FaTrash icon is used to display a trash icon in React Icons. It is a child component of the Fa component in React Icons. The Fa component is used to display icons in React Icons. The FaTrash icon is used to display a trash icon.
            //Next we have created another column with md= {4} and here we will display the subtotal of the cart items. We will display the total number of items in the cart and the total price of the cart. We will display the total number of items in the cart by using the reduce method on the cartItems array. The reduce method is used to reduce an array to a single value. It takes a callback function as an argument. The callback function takes two arguments, the accumulator and the current item. The accumulator is the value that is returned by the reduce method. The current item is the current item in the array. The reduce method also takes an initial value as an argument. In this case, the initial value is 0. The reduce method will return the total number of items in the cart by adding the quantity of each item to the accumulator. The total number of items in the cart is displayed in a h2 element. The h2 element displays the text "Subtotal" followed by the total number of items in the cart in parentheses.
            //Next we want the price to be displayed so we will have a $ sign followed by the total price of the cart. This is done once again by using reduce method on the cartItems array. The reduce method is used to reduce an array to a single value. It takes a callback function as an argument. The callback function takes two arguments, the accumulator and the current item. The accumulator is the value that is returned by the reduce method. The current item is the current item in the array. The reduce method also takes an initial value as an argument. In this case, the initial value is 0. The reduce method will return the total price of the cart by adding the price of each item multiplied by the quantity of each item to the accumulator. This will be fixed to two decimal places by using the toFixed(2) method.
            //Next in another ListGroup.Item component we will have the Proceed to Checkout Button which will be disabled if there are no items in the cart. The Button component is used to create a button in React Bootstrap. It is a child component of the ListGroup.Item component. The type attribute is set to button. The className attribute is set to btn-block. The btn-block class makes the button full width. The disabled attribute is set to cartItems.length === 0. This disables the button if there are no items in the cart. The children attribute is used to render the content of the button. In this case, the content of the button is "Proceed To Checkout".
          
          
              cartItems.length === 0 ? (
                <Message>
                  Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
              ) : (
                  <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                              <Link to={`/product/${item._id}`}>{item.name}
                                {item.name} 
                              </Link>
                            </Col>
                            <Col md={2}>
                              ${item.price}
                            </Col>
                            <Col md={2}>
                              <Form.Control
                                as='select'
                                value={item.qty}
                                onChange={(e) =>
                                  addToCartHandler(item, Number(e.target.value))
                                }
                              >
                                {[...Array(item.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                            <Col md={2}>
                              <Button
                                type='button'
                                variant='light'
                                onClick={() => removeFromCartHandler(item._id)}
                              >
                                <FaTrash />
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    )
                  }
                  </ListGroup>
              )
            }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                ${cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen