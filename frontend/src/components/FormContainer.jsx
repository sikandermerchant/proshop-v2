import { Container, Row, Col } from 'react-bootstrap'

///Here we have a FormContainer component that takes in children as a prop. The children prop is destructured from the props object. This children prop will be the form components that we want to render.
//  It will render a Container, Row, and Col from react-bootstrap. The Col will have a width of 6 for extra small and medium screens. It will render the children inside the Col. We will use this component to wrap our form components in the frontend.
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer