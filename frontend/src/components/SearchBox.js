import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ onBtnClick }) => {
    const hist = useHistory()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            hist.push(`/search/${keyword}`)
        } else {
            hist.push('/')
        }
        setKeyword('')
    }

    return (
        <Form onSubmit={submitHandler} inline className='my-2 my-lg-0'>
            <Form.Control
                type='text'
                name='q'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-0 ml-0 mr-lg-2 ml-lg-5' />
            <Button
                type='submit'
                variant='outline-success'
                className='p-2 searchBtn'
                onClick={onBtnClick}
            >Search</Button>
        </Form>
    )
}

export default SearchBox
