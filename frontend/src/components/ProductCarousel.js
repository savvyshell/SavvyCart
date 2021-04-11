import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from "./Loader"
import Message from "./Message"
import { productListTopRated } from "../actions/productActions"

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const selProductTopRated = useSelector(state => state.productListTopRated)
  const { loading, error, products } = selProductTopRated

  useEffect(() => {
    dispatch(productListTopRated())
  }, [dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Carousel pause='hover' className='bg-dark mb-5' fade>
        { products.map(product=> (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Carousel.Caption className='carousel-caption'>
                      <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                    <Image src={product.image} alt={product.name} fluid />
                </Link>
            </Carousel.Item>
        ))}
      </Carousel>
  )
}

export default ProductCarousel
