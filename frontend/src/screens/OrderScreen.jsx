import {Link, useParams} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';


const OrderScreen = () => {
  //First we will import the useParams hook from react-router-dom. The useParams hook will be used to get the order ID from the URL.
  const { id: orderId } = useParams();
  //We will then import the useGetOrderDetailsQuery hook from the ordersApiSlice file. We pass the URL data coming from the useParams hook to the useGetOrderDetailsQuery hook. The useGetOrderDetailsQuery hook will be used to get the order details from the API by passing the order ID to the API. The useGetOrderDetailsQuery hook will return an object with the data, isLoading and error properties. The data property will contain the order details, the isLoading property will be true if the data is being fetched and the error property will contain the error message if there is an error while fetching the data.
  //We will also get the refetch function from the useGetOrderDetailsQuery hook. The refetch function will be used to refetch the data when the user clicks on the refresh button so we don't end up with stale data.
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  
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