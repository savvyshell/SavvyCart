import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/userActions"

import FormContainer from "../components/FormContainer"
import {Button, Col, Form, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import Message from "../components/Message"
import Loader from "../components/Loader"

const RegisterScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notify, setNotify] = useState(null)

    const selUserAuth = useSelector(state => state.userAuth)
    const { loading, error, userInfo } = selUserAuth

    useEffect(() => {
        if (userInfo) {
            history.push('/profile')
        }
    }, [dispatch, userInfo, history])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword || password.length <= 0 || confirmPassword.length <= 0) {
            setNotify('Passwords do not match or are empty')
        } else if (name.length <= 0 || email.length <= 0) {
            setNotify('One or more fields are empty')
        } else {
            dispatch(registerUser(name, email, password))
        }
    }

    return (
        <div className='mt-5'>
            <FormContainer>
                <h3>Register</h3>
                {notify && <Message variant='danger'>{notify}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button onClick={onSubmitHandler} type='submit' variant='primary'>Register</Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an account?{' '}
                        <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default RegisterScreen
