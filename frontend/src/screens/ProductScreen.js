import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, productCreateReview } from '../actions/productActions'
import { cartAdd } from '../actions/cartActions'
import { PRODUCT_DETAILS_RESET, PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"

import Meta from "../components/Meta"
import {Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const [loadingProduct, setLoadingProduct] = useState(true)

    const dispatch = useDispatch()
    const m_id = match.params.id

    const selUserAuth = useSelector(state => state.userAuth)
    const { userInfo } = selUserAuth

    const selProductDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = selProductDetails

    const selProductReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading:loadingReviewCreate, error:errorReviewCreate, success:successReviewCreate } = selProductReviewCreate

    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_DETAILS_RESET })
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch])

    useEffect(() => {
        if (!product || product._id !== m_id || successReviewCreate) {
            setLoadingProduct(true)
            dispatch(productDetails(m_id))
        } else {
            setLoadingProduct(false)
            if (successReviewCreate) {
                alert('Review Submitted!')
                setRating(0)
                setComment('')
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            }
        }
    }, [m_id, dispatch, product, successReviewCreate])

    const cartAddHandler = (product, cfg) => {
        dispatch(cartAdd(product, cfg))
        history.push('/cart')
    }

    const onSubmitReviewCreateHandler = (e) => {
        e.preventDefault()
        dispatch(productCreateReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
    <>
        <Link className="btn btn-light my-3" to='/'>
            Go Back
        </Link>
        { loading && loadingProduct ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (<>
        <Meta title={product.name} />
        <Row>
            <Col lg={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col lg={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} numReviews={product.numReviews} />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col lg={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        { product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control
                                            as ='select'
                                            style = {{padding: '0 0', height: '20px', width: '70%'}}
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map(
                                                (x) => {
                                                    return (<option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>)
                                                }
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button type='button' disabled={product.countInStock === 0} block
                                onClick={() => cartAddHandler(product, { qty: qty })}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <hr />
        <Row className='mt-3'>
            <Col md={6}>
                <h3>Reviews</h3>
                { product.reviews.length === 0 && <Message>No Reviews</Message> }
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        { loadingReviewCreate && <Loader /> }
                        { errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message> }
                        {userInfo ? (<>
                            <Form onSubmit={onSubmitReviewCreateHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}/>
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                            </Form>
                        </>) : <Message variant='warning'>Please <Link to='/login'>login</Link> to write a review</Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>)}
    </>
    )
}

export default ProductScreen
