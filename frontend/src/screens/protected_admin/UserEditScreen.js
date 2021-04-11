import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, updateUserById } from "../../actions/userActions"
import { USER_UPDATE_RESET } from "../../constants/userConstants"

import FormContainer from "../../components/FormContainer"
import {Button, Form} from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"

const UserEditScreen = ({ match, history }) => {
  const userID = match.params.id
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const selUserProfile = useSelector(state => state.userProfile)
  const { loading, error, profile } = selUserProfile

  const selUserUpdate = useSelector(state => state.userUpdate)
  const { loading:loadingUserUpdate, error:errorUserUpdate, success:successUpdate } = selUserUpdate

  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET })
        history.push('/admin/userlist')
    } else {
      if (!profile || profile._id !== userID) {
        dispatch(getUserById(userID))
      } else {
        console.log(profile)
        setName(profile.name)
        setEmail(profile.email)
        setIsAdmin(profile.isAdmin)
      }
    }
  }, [dispatch, profile, userID, successUpdate, history])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserById({ _id: userID, name, email, isAdmin }))
  }

  return (<>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
      <div>
        <FormContainer>
        <h3>Edit User</h3>
        { loadingUserUpdate && <Loader />}
        { errorUserUpdate && <Message variant='danger'>{errorUserUpdate}</Message> }
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

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='isAdmin'>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>

              <Button onClick={onSubmitHandler} type='submit' variant='primary'>Update</Button>
            </Form>
        )}
        </FormContainer>
      </div>
  </>)
}

export default UserEditScreen
