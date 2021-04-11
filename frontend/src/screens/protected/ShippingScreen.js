import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSaveShippingAddress } from "../../actions/cartActions"

import { Form, Button } from 'react-bootstrap'
import FormContainer from "../../components/FormContainer"
import CheckoutSteps from "../../components/CheckoutSteps"

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch()

    const selCart = useSelector(state => state.cart)
    const { shippingAddress } = selCart

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }
    }, [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(cartSaveShippingAddress({
            address, city, postalCode, country
        }))
        history.push('/payment')
    }

    return (<div className='mt-5'>
        <CheckoutSteps step1 step2 />
        <FormContainer>
            <h2>Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    </div>)
}

export default ShippingScreen
