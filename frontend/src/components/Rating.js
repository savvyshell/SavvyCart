import React from 'react'

const Rating = ({ value, numReviews }) => {
    const stars = [1, 2, 3, 4, 5].map(i => {
        return (
            value >= i ? <i key={i} className='fas fa-star'/>
            : value >= i - 0.5 ? <i key={i} className="fas fa-star-half-alt"/>
            : <i key={i} className="far fa-star"/>
        )
    })

    return (
    <div style={{'color': 'orange'}}>
        { stars }
        <span className='ml-2' style={{'color': 'black'}}>{ numReviews } reviews</span>
    </div>
  )
}

export default Rating
