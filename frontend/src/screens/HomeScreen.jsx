import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
//import products from '../products' // data/products.js file fetching data from frontend
import axios from 'axios'


const HomeScreen = () => {
  const [products, setProducts] = useState([]); // useState is a hook that lets you add React state to function components
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  
  return (
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

export default HomeScreen