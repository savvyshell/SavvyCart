import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from "./Rating";
import {Link} from "react-router-dom";

const Product = ({ item }) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${item._id}`}>
            <Card.Img src={ item.image } variant='top' />
        </Link>
        <Card.Body>
            <Link to={`/product/${item._id}`}>
                <Card.Title as='div'>{item.name}</Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={item.rating} numReviews={item.numReviews} />
            </Card.Text>

            <Card.Text as='h3' className='mt-2'>
                ${item.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
