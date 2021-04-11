import React from 'react'
import PropTypes from 'prop-types'
import {Route, useLocation} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import Message from "../../components/Message"

const AdminRoute = ({ path, component, location, ...props }) => {
    const loc = useLocation()
    const isAdminPath = loc.pathname.includes('/admin')
    const selUserAuth = useSelector(state => state.userAuth)
    const { userInfo } = selUserAuth
    return userInfo && userInfo.isAdmin ? (
      <Route path={path} component={component} {...props} />
    ) : loc && isAdminPath ? (<>
      <div className='mt-5' />
      <Message variant='danger'>Unauthorized access, you are not admin.</Message>
      <LinkContainer to='/'>
           <Button variant='primary'>Go home</Button>
      </LinkContainer>
    </>) : ''
}

AdminRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired
}

export default AdminRoute
