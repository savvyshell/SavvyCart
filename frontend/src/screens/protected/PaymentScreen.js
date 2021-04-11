import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSavePaymentMethod } from "../../actions/cartActions"

import { Col, Form, Button } from 'react-bootstrap'
import FormContainer from "../../components/FormContainer"
import CheckoutSteps from "../../components/CheckoutSteps"

import { ORDER_CREATE_RESET } from "../../constants/orderConstants"

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()

  const selCart = useSelector(state => state.cart)
  const { shippingAddress } = selCart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: ORDER_CREATE_RESET })
    dispatch(cartSavePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (<div className='mt-5'>
    <CheckoutSteps step1 step2 step3 />
    <FormContainer>
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label className='mt-3' as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                />
          </Col>
        </Form.Group>
        <Button className='mt-2' type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  </div>)
}

export default PaymentScreen
