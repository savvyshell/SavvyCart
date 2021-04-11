import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../../components/FormContainer"
import CheckoutSteps from "../../components/CheckoutSteps"
import { orderCreate } from '../../actions/orderActions'
import { CART_CLEAR } from "../../constants/cartConstants"

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const selCart = useSelector(state => state.cart)
  const { shippingAddress, paymentMethod, cartItems } = selCart

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // Price calculations
  selCart.itemsPrice = addDecimals(cartItems.reduce((accum, i) => accum + i.price * i.qty, 0))
  selCart.shippingPrice = addDecimals(selCart.itemsPrice > 100 ? 0 : 100)
  selCart.taxPrice = addDecimals(Number((0.15 * selCart.itemsPrice).toFixed(2)))
  selCart.totalPrice = (Number(selCart.itemsPrice) + Number(selCart.shippingPrice) + Number(selCart.taxPrice)).toFixed(2)

  const selOrder = useSelector(state => state.orderCreate)
  const { order, success, error } = selOrder

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_CLEAR })
      history.push(`/order/${order._id}`)
    }
  }, [dispatch, history, success, order])

  const placeOrderHandler = () => {
    const order = {
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    }
    dispatch(orderCreate(order))
  }

  return (<div className='mt-5'>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                { shippingAddress.address },
                { shippingAddress.city },
                { shippingAddress.postalCode },
                { shippingAddress.country }
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                { paymentMethod }
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              { cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col className='mb-sm-3' md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          { item.qty } x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='pt-4'>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${selCart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${selCart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${selCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${selCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error ?
                <ListGroup.Item>
                   <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              : ''}
              <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </div>)
}

export default PlaceOrderScreen
