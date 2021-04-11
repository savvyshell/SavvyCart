import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList, deleteUserById } from "../../actions/userActions"

import { Table, Button } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {USER_DELETE_RESET} from "../../constants/userConstants";

const UsersListScreen = () => {
  const dispatch = useDispatch()

  const selUserList = useSelector(state => state.userList)
  const { loading, error, users } = selUserList

  const selUserDel = useSelector(state => state.userDelete)
  const { loading:loadingDel, success:successDel, error:errorDel } = selUserDel

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DELETE_RESET })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch, successDel])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUserById(id))
    }
  }

  return (<div className='mt-5'>
    <h3>Users</h3>
    { loadingDel ? <Loader /> :
        errorDel ? <Message variant='danger'>Error deleting user</Message>
            : successDel
            ? <Message variant='success'>User deleted successfully</Message>
            :''
    }
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {user.isAdmin ? (
                        <i className='fas fa-check' style={{color: 'green'}} />) : (
                        <i className='fas fa-times' style={{color: 'red'}} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'/>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => {deleteHandler(user._id)}}>
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
            ))}
          </tbody>
        </Table>
    )}

  </div>)
}

export default UsersListScreen
