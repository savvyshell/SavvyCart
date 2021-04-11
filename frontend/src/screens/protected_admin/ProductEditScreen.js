import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, productUpdate } from "../../actions/productActions"
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from "../../constants/productConstants"

import FormContainer from "../../components/FormContainer"
import {Button, Form} from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"

const ProductEditScreen = ({ match, history }) => {
    const productID = match.params.id
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState( '')
    const [brand, setBrand] = useState( '')
    const [category, setCategory] = useState( '')
    const [countInStock, setCountInStock] = useState( 0)
    const [description, setDescription] = useState( '')
    const [uploading, setUploading] = useState( false)

    const selProductDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = selProductDetails

    const selProductUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = selProductUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch({ type: PRODUCT_DETAILS_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product || product._id !== productID) {
                dispatch(productDetails(productID))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [history, dispatch, productID, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
        const { data } = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        setImage(data)
            setUploading(false)
        } catch (err) {
            console.log(err)
            setUploading(false)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(productUpdate({
            _id: productID,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (<>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <div>
            <FormContainer>
                <h3>Edit Product</h3>
                { loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='error'>{errorUpdate}</Message> : ''}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler} />
                            { uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count In Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button onClick={onSubmitHandler} type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    </>)
}

export default ProductEditScreen
