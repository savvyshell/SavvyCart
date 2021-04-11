import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DETAILS_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants"

const OrderScreen = ({ history, match }) => {
  const orderID = match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()

  const selUserAuth = useSelector(state => state.userAuth)
  const { userInfo } = selUserAuth

  const selOrderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = selOrderDetails

  const selOrderPay = useSelector(state => state.orderPay)
  const { loading:loadingPay, success:successPay } = selOrderPay

  const selOrderDeliver = useSelector(state => state.orderDeliver)
  const { loading:loadingDeliver, success:successDeliver, error:errorDeliver } = selOrderDeliver

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  if (order) {
    order.itemsPrice = Number(addDecimals(order.orderItems.reduce((accum, i) => accum + i.price * i.qty, 0)))
    order.totalPrice = addDecimals(order.totalPrice)
  }

  useEffect(() => { // demount
    return () => {
      const checkIfExists = document.querySelector(`script[title="Paypal"]`)
      if (checkIfExists) { document.body.removeChild(checkIfExists) }
    }
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPaypalScript = async () => {
      const { data: clientID } = await axios.get('/api/config/paypal')

      const checkIfExists = document.querySelector(`script[title="Paypal"]`)
      if (checkIfExists){
        return checkIfExists
      }

      const ppScript = document.createElement('script')
      ppScript.type = 'text/javascript'
      ppScript.title = 'Paypal'
      ppScript.async = true
      ppScript.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
      ppScript.onload = () => {
        console.log("OnLoad Paypal")
        setSdkReady(true)
      }
      document.body.appendChild(ppScript)
      return ppScript
    }

    addPaypalScript()

    if (!order || (order && order._id !== orderID ) || successPay || successDeliver) {
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderID))
    } else if (order && !order.isPaid) {
      if (!document.querySelector(`script[title="Paypal"]`)) {
        console.log("Loading again?")
        addPaypalScript()
      } else {
        // setSdkReady(true)
      }
    }
  }, [history, userInfo, dispatch, order, orderID, successPay, successDeliver])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderID, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderID))
  }

  return (<div className='mt-5'>

    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <div className='mb-4'>
            <i className='fas fa-chevron-left' /> <Link to='/profile'> My Orders</Link>
            { userInfo.isAdmin && (<>
                <i className='fas fa-chevron-left ml-4' /> <Link to='/admin/orderlist'> Admin Orders</Link>
            </>)}
          </div>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    { order.shippingAddress.address },
                    { order.shippingAddress.city },
                    { order.shippingAddress.postalCode },
                    { order.shippingAddress.country }
                  </p>
                  {order.isDelivered ?
                      <Message variant='success'>Delivered at {order.deliveredAt}</Message> :
                      <Message variant='danger'>Not Delivered</Message>
                  }
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Method: </strong>
                    { order.paymentMethod }
                  </p>
                  {order.isPaid ?
                      <Message variant='success'>Paid on {order.paidAt}</Message> :
                      <Message variant='danger'>Not Paid</Message>
                  }
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Order Items</h3>
                  { order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item) => (
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                      <ListGroup.Item>
                        { loadingPay && <Loader /> }
                        { !sdkReady ? <Loader /> : (
                            <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                                onError={(err) => {
                                  console.log("On Error")
                                  console.log(err)
                                }}
                                catchError={(err) => {
                                  console.log("Catch Error")
                                  console.log(err)
                                }}
                            />
                        )}
                      </ListGroup.Item>
                  )}

                  { userInfo && userInfo.isAdmin
                    && order.isPaid
                    && !order.isDelivered ?
                      (
                      <ListGroup.Item>
                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                          Mark as Delivered
                        </Button>
                      </ListGroup.Item>
                      ) : loadingDeliver  ?
                          <Loader />      :
                          errorDeliver    ?
                          <Message variant='danger'>Error submitting deliver request</Message> : ''}
                </ListGroup>
              </Card>

            </Col>
          </Row>
        </>
    )}

  </div>)
}

export default OrderScreen
