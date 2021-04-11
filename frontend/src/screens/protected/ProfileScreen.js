import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileById, updateUserProfile, updateUserProfileReset } from "../../actions/userActions"
import { getMyOrdersList } from "../../actions/orderActions"

import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()

    const selUserAuth = useSelector(state => state.userAuth)
    const { userInfo } = selUserAuth

    const selUserProfile = useSelector(state => state.userProfile)
    const { loading, error, profile, success } = selUserProfile

    const selOrderMyList = useSelector(state => state.orderMyList)
    const { loading:loadingList, error:errorList, myOrders } = selOrderMyList

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!profile) {
                dispatch(getUserProfileById(userInfo._id))
                dispatch(getMyOrdersList())
            } else {
                setName(profile.name)
                setEmail(profile.email)
            }
        }
    }, [dispatch, userInfo, profile, history])

    useLayoutEffect(() => () => {
        dispatch(updateUserProfileReset())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage(null)
        if (password !== confirmPassword || password.length <= 0 || confirmPassword.length <= 0) {
            setMessage('Passwords do not match or are empty!')
        } else if (email.length <= 0 || name.length <= 0) {
            if (email.length <= 0) {
                setMessage('Email length empty')
            } else {
                setMessage('Name length empty')
            }
        } else {
            // Update Profile
            dispatch(updateUserProfile({ name, email, password }))
        }
    }

    return (<div className='mt-5'>
    <Row>
        <Col md={3}>
            <h2>Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {}
            {!message && success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )}
        </Col>
        <Col md={9}>
            <h2 className='mt-5 mt-md-0'>My Orders</h2>
            { loadingList ? <Loader /> : errorList ? <Message variant='danger'>{ errorList }</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
    </div>)
}

export default ProfileScreen
