import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartAdd, cartRemove } from '../actions/cartActions'

import {Row, Col, ListGroup, Card, Button, Image, Form} from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = ({ history }) => {
    const dispatch = useDispatch()

    const selCart = useSelector(state => state.cart)
    const { cartItems } = selCart

    const checkoutHandler = () => {
        history.push('/shipping')
    }

    const removeFromCartHandler = (product) => {
        dispatch(cartRemove(product))
    }

    return (
    <div className='mt-5'>
        <h3>Cart</h3>
        <Row>
            <Col md={8}>
            { cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
            ) : (

            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>{item.price}</Col>
                      <Col md={2}>
                          <Form.Control
                              as ='select'
                              style = {{padding: '0 0', height: '20px', width: '70%'}}
                              value={item.qty}
                              onChange={(e) => dispatch(cartAdd(item, { qty: e.target.value }))}
                          >
                              {[...Array(item.countInStock).keys()].map(
                                  (x) => {
                                      return (<option key={x + 1} value={x + 1}>
                                          {x + 1}
                                      </option>)
                                  }
                              )}
                          </Form.Control>
                      </Col>
                      <Col md={2}>
                          <Button
                            style={{padding: '0 1.25rem'}}
                            type='button'
                            variant='light'
                            onClick={() => removeFromCartHandler(item)}
                          >
                            <i className='fas fa-trash' />
                          </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
              ))}
            </ListGroup>
            )}
            </Col>
            <Col md={4}>
              <Card>
                  <ListGroup.Item variant='flush'>
                      <ListGroup.Item>
                          <h4>
                              Subtotal ({ cartItems.reduce((accum, item) => accum + parseInt(item.qty), 0 )}) items
                          </h4>
                          <h5>
                              $ { (cartItems.reduce((accum, item) => accum + item.qty * item.price , 0)).toFixed(2) }
                          </h5>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={() => {checkoutHandler()}}
                          >
                              Proceed To Checkout
                          </Button>
                      </ListGroup.Item>
                  </ListGroup.Item>
              </Card>
            </Col>
        </Row>
    </div>
    )
}

export default CartScreen
