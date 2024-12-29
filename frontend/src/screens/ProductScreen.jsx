// import React, { useEffect, useState } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux"; //import the useDispatch hook from react-redux. This hook allows us to dispatch actions which are functions that return objects. In this case we are using it to dispatch the addToCart action.
import Rating from "../components/Rating";
// import products from "../products";
// import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productID } = useParams(); //get the product id from the URL
  const dispatch = useDispatch(); //initialize the dispatch function
  const navigate = useNavigate();//initialize the navigate function
  const [qty, setQty] = useState(1); //set the quantity of the product using the useState hook, default value is 1
  
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/${productID}`);
  //       setProduct(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching the product:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productID]);
  const {
    data: product,
    error,
    isLoading
  } = useGetProductDetailsQuery(productID);//use the useGetProductDetailsQuery hook to fetch the product details
  // console.log([...Array(product.countInStock).keys()]); //logs an array of numbers from 0 to the countInStock - 1. For example if we have 5 items in stock, it will log [0, 1, 2, 3, 4]

  //Create an addToCartHandler function that dispatches the addToCart action and redirects to the cart page
  const addToCartHandler = () => { 
    //dispatch the addToCart action with the product and quantity coming from the state using the dispatch function
    dispatch(addToCart({ ...product, qty }));
    //redirect to the cart page
    navigate('/cart ');
  };
  return (
    <>
      <Link className='btn btn-light my-3'
        to='/'>
        Go Back
      </Link>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error?.message || 'An error occured'}</Message>
      ) :
      (
        <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
                    {product.countInStock > 0 && ( //if the product is in stock, show the quantity dropdown
                      //Create a ListGroup.Item to display the quantity dropdown with the label Qty and a Form.Control as a select dropdown which has the value of qty and an onChange event handler that sets the qty to the value of the select dropdown to a Number. 
                      // Then, create an array of numbers from 1 to the countInStock (inventory available for that product) of the product using the Array.from method and the keys method. 
                      //The keys method creates an array of numbers from 0 to the countInStock - 1. For example, if we have 5 items in stock, it will log [0, 1, 2, 3, 4].
                      // Then, map through the array and create an option element with the key as the value and the key + 1 as the text. 
                      // Finally, set the text value of the option to x + 1.
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0} //if the product is out of stock, disable the button
                        onClick={addToCartHandler} //add an onClick event handler that calls the addToCartHandler function
                      >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
      
    </>
  )
}

export default ProductScreen