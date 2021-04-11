import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productList } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from "../components/Product";

import Meta from "../components/Meta"
import Loader from '../components/Loader'
import Paginate from "../components/Paginate"
import Message from '../components/Message'
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const selProductList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = selProductList

    useEffect(() => {
        dispatch(productList(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (<>
    <Meta />
    <div className='mt-5'>
        { !keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link> }
        <h3 className='mb-0'>Products</h3>
        { loading ? ( <Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (<>
            <Row>
            {products.map(product => {
                return (
                    <Col className='d-flex align-items-stretch' key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product item={product} />
                    </Col>
                )
            })}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>)}
    </div>
    </>)
}

export default HomeScreen
