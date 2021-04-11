import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from "../actions/userActions"
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

const LoginScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const selUserAuth = useSelector(state => state.userAuth)
    const { loading, error, userInfo } = selUserAuth

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(authUser(email, password))
    }

    return (
    <div className='mt-5'>
        <FormContainer>
            <h3>Login</h3>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ''}
            <Form onSubmit={onSubmitHandler}>
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
                <Button type='submit' variant='primary'>Login</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    </div>
    )
}

export default LoginScreen
