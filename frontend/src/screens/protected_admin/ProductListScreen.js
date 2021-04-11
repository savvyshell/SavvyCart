import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productList, productDelete, productCreate } from "../../actions/productActions"
import { PRODUCT_DELETE_RESET, PRODUCT_CREATE_RESET } from "../../constants/productConstants"

import { Table, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from "../../components/Paginate"

const ProductListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const selUserAuth = useSelector(state => state.userAuth)
  const { userInfo } = selUserAuth

  const selProductList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = selProductList

  const selProductDel = useSelector(state => state.productDelete)
  const { loading:loadingDel, error:errorDel, success:successDel } = selProductDel

  const selProductCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = selProductCreate

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(productList('', pageNumber))
    }
  }, [history, match, dispatch, successDel, successCreate, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productDelete(id))
    }
  }

  const createProductHandler = () => {
    dispatch(productCreate())
  }

  return (<div className='mt-4'>
    <Row className='align-items-center'>
      <Col>
        <h3>Products</h3>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={createProductHandler}>
          <i className='fas fa-plus'/> Create Product
        </Button>
      </Col>
    </Row>
    { loadingDel ? <Loader /> : error ? <Message variant='danger'>{errorDel}</Message> : ''}
    { successDel ? <Message variant='success'>Product successfully deleted</Message> : ''}
    { loadingCreate ? <Loader /> : errorCreate ? <Message variant='danger'>{errorCreate}</Message> : ''}
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>{product.name}</Link>
                </td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'/>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => {deleteHandler(product._id)}}>
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={ userInfo && userInfo.isAdmin } />
    </>)}

  </div>)
}

export default ProductListScreen
