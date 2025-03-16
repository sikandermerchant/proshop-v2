import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  //Here we are calling the cart from the cart slice. The destructured object will contain the cart information.
  //By using the useSelector hook, we can access the state of the store. We will pass in a function that will take in the state as an argument and return the cart object from the state.
  //cart will contain the cart information. If the cart is not empty, cart will be an object with the cart information. If the cart is empty, cart will be an object with the cart information. You can see this in the redux dev tools
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  //Lets create a component level state for the address, city, postal code, and country. We will use the useState hook to create these states. We will set the initial value of the address, city, postal code, and country to the shipping address in the cart. If the shipping address is not in the cart, we will set the initial value to an empty string.
  const [address, setAddress] = useState(shippingAddress?.address || '' )
  const [city, setCity] = useState(shippingAddress?.city || '' )
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalcode || '' )
  const [country, setCountry] = useState(shippingAddress?.country || '' )

  //Here we will create dispatch and navigate variables using the useDispatch and useNavigate hooks respectively.
  //useDispatch is a hook that returns a reference to the dispatch function from the Redux store. We will use this to dispatch actions to the store.
  //useNavigate is a hook that returns a navigate function. We will use this to navigate to different pages in our application.
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log('submit')
    //Here we are dispatching the saveShippingAddress action from the cart slice with the address, city, postal code, and country as the payload. saveShippingAddress is an action that will take in the state and the action as parameters. The action will have the address, city, postal code, and country as the payload. We will set the shippingAddress object in the state to the payload.
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    //Finally we will redirect the user to the payment page. We will use the navigate function to redirect the user to the payment page.
    navigate('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>
        Shipping
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='my-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen