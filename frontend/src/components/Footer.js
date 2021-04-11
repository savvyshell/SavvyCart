import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (<>
    <div className='mt-5' />
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; SavvyCart {new Date().getFullYear()}
                </Col>
            </Row>
        </Container>
    </footer>
  </>)
}

export default Footer
