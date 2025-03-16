import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


//Here we are creating a functional component called CheckoutSteps. CheckoutSteps will take in step1, step2, step3, and step4 as props. These props will be booleans that will determine if the step is completed or not. If the step is completed, the step will be a link that the user can click on. If the step is not completed, the step will be disabled and the user will not be able to click on it.
//We are using the Nav and LinkContainer components from react-bootstrap to create the steps. The Nav component will contain the steps. The LinkContainer component will create a link that the user can click on. If the step is completed, the user will be able to click on the link. If the step is not completed, the user will not be able to click on the link.
//We are using the ternary operator to check if the step is completed or not. If the step is completed, we will create a link using the LinkContainer component. If the step is not completed, we will create a disabled link using the Nav component.
const CheckoutSteps = ( {step1, step2, step3, step4} ) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Sign In</Nav.Link>}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Payment</Nav.Link>}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Place Order</Nav.Link>}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps