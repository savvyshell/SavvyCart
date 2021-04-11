import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersList } from "../../actions/orderActions"

import { Table, Button } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../../components/Message"
import Loader from "../../components/Loader"

const OrderListScreen = () => {
    const dispatch = useDispatch()

    const selOrderList = useSelector(state => state.orderList)
    const { loading, error, orders } = selOrderList

    useEffect(() => {
        dispatch(getOrdersList())
    }, [dispatch])

    return (<div className='mt-5'>
        <h3>Orders</h3>
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.isPaid ? (
                                order.paidAt.substring(0, 10)) : (
                                <i className='fas fa-times' style={{color: 'red'}} />
                            )}
                        </td>
                        <td>
                            {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)) : (
                                <i className='fas fa-times' style={{color: 'red'}} />
                            )}
                        </td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )}

    </div>)
}

export default OrderListScreen
