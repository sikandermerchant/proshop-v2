import {Link, useParams} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap';
import {PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';


const OrderScreen = () => {
  //First we will import the useParams hook from react-router-dom. The useParams hook will be used to get the order ID from the URL.
  const { id: orderId } = useParams();
  //We will then import the useGetOrderDetailsQuery hook from the ordersApiSlice file. We pass the URL data coming from the useParams hook to the useGetOrderDetailsQuery hook. The useGetOrderDetailsQuery hook will be used to get the order details from the API by passing the order ID to the API. The useGetOrderDetailsQuery hook will return an object with the data, isLoading and error properties. The data property will contain the order details, the isLoading property will be true if the data is being fetched and the error property will contain the error message if there is an error while fetching the data.
  //We will also get the refetch function from the useGetOrderDetailsQuery hook. The refetch function will be used to refetch the data when the user clicks on the refresh button so we don't end up with stale data.
  const {
    data: order,
    refetch,
    isLoading,
    error
  } = useGetOrderDetailsQuery(orderId);
  //Here we are using the usePayOrderMutation hook to pay for the order. What we get back is an array with the first element being the payOrder function and the second element being an object with the isLoading property. The isLoading property will be true if the data is being fetched and the payOrder function will be used to pay for the order. The payOrder function will be used in the PayPalButtons component to pay for the order. We already have iSLoading property from the useGetOrderDetailsQuery hook so we will rename the isLoading property to loadingPay. The loadingPay property will be true if the data is being fetched and the payOrder function will be used to pay for the order. The payOrder function will be used in the PayPalButtons component to pay for the order.
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  //Now from the usePayPalScriptReducer hook we will 
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  //Here from the useGetPayPalClientIdQuery we get data from the API. The data will contain the client ID from the .env file
  //We will get isLoading which we will rename to loadingPayPal and error which we will rename to errorPaypal. The isLoading property will be true if the data is being fetched and the error property will contain the error message if there is an error while fetching the data. The useGetPayPalClientIdQuery hook will be used to get the PayPal client ID from the API. The useGetPayPalClientIdQuery hook will return an object with the data, isLoading and error properties. The data property will contain the PayPal client ID, the isLoading property will be true if the data is being fetched and the error property will contain the error message if there is an error while fetching the data.
  const { data: paypal, isLoading: loadingPayPal, error: errorPaypal } = useGetPayPalClientIdQuery();

  //We will then import the useSelector hook from react-redux. The useSelector hook will be used to get the userInfo from the store. The userInfo will be used to check if the user is logged in or not. If the user is not logged in, we will redirect the user to the login page.
  const { userInfo } = useSelector((state) => state.auth);

  //Now we will create a useEffect hook to first check if there are any errors, if not loading and if paypal.clientId is present. If all these conditions are true, we will load the PayPal script. The loadPayPalScript function will be an async function that will get the client ID from the paypal.clientId and then we will dispatch payPalDispatch with an object with the type resetOptions and value as an object with the client ID and currency. The currency will be set to USD. 
  // We will then dispatch the payPalDispatch with the type setLoadingStatus and value as pending. This will load the PayPal script and set the loading status to pending.
  //We will then check if there is an order and if the order is not paid. If the order is not paid, we will check if the window.paypal is not present. If the window.paypal is not present, we will call the loadPayPalScript function. 
  // If the window.paypal is present, we will dispatch the payPalDispatch with the type setLoadingStatus and value as pending. This will load the PayPal script and set the loading status to pending.
  //This useEffect depends on the order, paypal, errorPaypal, loadingPayPal and payPalDispatch. If any of these values change, the useEffect will run again.
  //The useEffect will run when the component is mounted and when the order, paypal, errorPaypal, loadingPayPal and payPalDispatch values change.
  useEffect(() => {
    if(!errorPaypal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        const { data: clientId } = await paypal.clientId;
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if(order && !order.isPaid) {
        if(!window.paypal) {
          loadPayPalScript();
        }
        else {
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        }
      }
    }
  }, [order, paypal, errorPaypal, loadingPayPal, paypalDispatch]);
  
  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : ( 
        <>
          <h1> Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>
                      Not Delivered
                    </Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>
                      Paid on {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>
                      Not Paid
                    </Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
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
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  {/* PAY ORDER PLACEHOLDER */}
                  {/* MARK AS DELIVERED PLACEHOLDER */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
      </>
  )
    
}

export default OrderScreen