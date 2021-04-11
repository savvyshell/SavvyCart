import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"

import AdminRoute from "./definitions/routes/AdminRoute"

// Screens
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

// Protected Screens
import ProfileScreen from "./screens/protected/ProfileScreen"
import ShippingScreen from "./screens/protected/ShippingScreen"
import PaymentScreen from "./screens/protected/PaymentScreen"
import PlaceOrderScreen from "./screens/protected/PlaceOrderScreen"
import OrderScreen from "./screens/protected/OrderScreen"

// Protected -> Admin Screens
import UsersListScreen from "./screens/protected_admin/UsersListScreen"
import UserEditScreen from "./screens/protected_admin/UserEditScreen"
import ProductListScreen from "./screens/protected_admin/ProductListScreen"
import ProductEditScreen from "./screens/protected_admin/ProductEditScreen"
import OrderListScreen from "./screens/protected_admin/OrderListScreen"

function App() {
  return (
      <BrowserRouter>
        <div className="app">
            <Header />
            <Container className="main">

                <Route path='/' component={HomeScreen} exact />
                <Route path='/page/:pageNumber' component={HomeScreen} exact />
                <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
                <Route path='/search/:keyword' component={HomeScreen} exact />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart' component={CartScreen} />
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={RegisterScreen} />

                <Route path='/profile' component={ProfileScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/payment' component={PaymentScreen} />
                <Route path='/placeorder' component={PlaceOrderScreen} />
                <Route path='/order/:id' component={OrderScreen} />

                <AdminRoute path='/admin/userlist' component={UsersListScreen} />
                <AdminRoute path='/admin/user/:id/edit' component={UserEditScreen} />
                <AdminRoute path='/admin/productlist' component={ProductListScreen} exact />
                <AdminRoute path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
                <AdminRoute path='/admin/product/:id/edit' component={ProductEditScreen} />
                <AdminRoute path='/admin/orderlist' component={OrderListScreen} />

            </Container>
            <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
