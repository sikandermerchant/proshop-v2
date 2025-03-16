import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {
  //Here we are creating a component level state for the paymentMethod. We will use the useState hook to create this state. We will set the initial value of the paymentMethod to PayPal.
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  //Here we are using the useEffect hook to check if the shipping address is not in the cart. If the shipping address is not in the cart, we will redirect the user to the shipping page. We will use the navigate function to redirect the user to the shipping page.
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }
    , [shippingAddress, navigate])
  
  //Here we are creating a submitHandler function that will be called when the form is submitted. The submitHandler function will prevent the default behavior of the form. We will dispatch the savePaymentMethod action from the cart slice with the paymentMethod as the payload. savePaymentMethod is an action that will take in the state and the action as parameters. The action will have the paymentMethod as the payload. We will set the paymentMethod in the state to the payload. Finally we will redirect the user to the place order page. We will use the navigate function to redirect the user to the place order page.
    const submitHandler = (e) => {
      e.preventDefault()
      // console.log('submit')
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              className='my-2'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen