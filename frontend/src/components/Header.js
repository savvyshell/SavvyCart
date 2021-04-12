import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deauthUser } from "../actions/userActions";

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import SearchBox from "./SearchBox"

const Header = ({ history }) => {
    const [navExpanded, setNavExpanded] = useState(false)
    const dispatch = useDispatch()

    const selCart = useSelector(state => state.cart)
    const { cartItems } = selCart

    const selUserAuth = useSelector(state => state.userAuth)
    const { userInfo } = selUserAuth

    const logoutHandler = () => {
        dispatch(deauthUser())
        history.push('/login')
    }

    const navClickExpandHandler = () => {
        setNavExpanded(navExpanded ? false : "expanded")
    }

    const navItemClickHandler = () => {
        console.log("Clicked")
        setNavExpanded(false)
    }

    return (
    <header>
        <Navbar bg="primary" variant="dark" expand="lg" expanded={navExpanded}>
            <Container>
                <Link to='/'>
                    <Navbar.Brand>SavvyCart</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={navClickExpandHandler} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox onBtnClick={navItemClickHandler} />
                    <Nav className="ml-auto">
                        <Link to='/cart' onClick={navItemClickHandler}>
                            <div className="nav-link">Cart ({cartItems.length})</div>
                        </Link>
                        {userInfo ?
                            (<NavDropdown title={ userInfo.name } id='username'>
                                <LinkContainer to='/profile' onClick={navItemClickHandler}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={() => logoutHandler()}>Logout</NavDropdown.Item>
                            </NavDropdown>) :
                            (<Link to='/login' onClick={navItemClickHandler}>
                                <div className='nav-link'>Login</div>
                            </Link>)
                        }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminMenu'>
                                <LinkContainer to='/admin/userlist' onClick={navItemClickHandler}>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist' onClick={navItemClickHandler}>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist' onClick={navItemClickHandler}>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default withRouter(Header)
