import { useEffect } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
  //We will use the useNavigate hook from react-router-dom to navigate to the next screen.  
  const navigate = useNavigate()
  //We will use the useDispatch hook from react-redux to dispatch actions.
  const dispatch = useDispatch()
  //We will use the useSelector hook from react-redux to get the cart state.
  const cart = useSelector((state) => state.cart)
  //We will use the useEffect hook from react to check if the shipping address and payment method are set in the cart state. If the shipping address and payment method are not set, we will navigate to the shipping and payment screens respectively.

  //We will use the useCreateOrderMutation hook from the ordersApiSlice to create a new order. The useCreateOrderMutation hook will return a tuple with an object and a function. The object will contain the status of the mutation and the data returned by the mutation. The function will be used to trigger the mutation.
  //Here the createOrder function is called when the place order button is clicked. This function was created in the ordersApiSlice.js file. The createOrder function takes the order data as a parameter from the cart state. The order data includes the order items, shipping address, payment method, items price, tax price, shipping price, and total price.
  //If the order is created successfully, the user will be redirected to the order screen. If there is an error creating the order, an error message will be shown.
  //isLoading is used to show a loader when the order is being created.
  //error is used to show an error message if there is an error creating the order.
  const [createOrder, { isLoading, error}] = useCreateOrderMutation()
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const placeOrderHandler = async () => { 
    // console.log('place order')
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice
      }).unwrap()
      dispatch(clearCartItems())
      toast.success('Order Created')
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error)
    }

  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    ${cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    ${cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>
                    ${cart.taxPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Total:</strong></Col>
                  <Col>
                    ${cart.totalPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler} 
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen