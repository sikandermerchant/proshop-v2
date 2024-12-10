//This wont be needed as we will be fetching data from backend using Redux Toolkit Query
// import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
//import products from '../products' // data/products.js file fetching data from frontend
//This will not be needed as we will be fetching data from backend using Redux Toolkit Query
// import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'


const HomeScreen = () => {
  //This will not be needed as we will be fetching data from backend using Redux Toolkit Query
  // const [products, setProducts] = useState([]); // useState is a hook that lets you add React state to function components
  //This will not be needed as we will be fetching data from backend using Redux Toolkit Query
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await axios.get('/api/products');
  //       setProducts(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching the products:", error);
  //     }
  //   };
  
  //   fetchProducts();
  // }, []);
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log('Error:', error);
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
          <Message variant='danger'>{error?.data?.message || error?.message || 'An error occured'}</Message>
        ):(
            <>
              <h1>Latest Products</h1>
              <Row>
                {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )
      }
    </>
  )
}

export default HomeScreen