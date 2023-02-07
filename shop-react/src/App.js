import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Products from './components/Products'
import Layout from './pages/Layout'

import Login from './components/accounts/Login'
import Signup from './components/accounts/Signup'
import VerifyEmail from './components/accounts/VerifyEmail'

import { useDispatch, useSelector } from 'react-redux'
import { getToken } from './sevices/LocalStorageService'
import { setUserToken } from './features/UserToken'
import ProductDetail from './components/ProductDetail'
import FilterProducts from './components/FilterProducts'
import Cart from './components/Cart'
import PlaceOrder from './components/PlaceOrder'
import Orders from './components/Orders'
import Customer from './components/Customer'
import PasswordChange from './components/accounts/PasswordChange'
import SendEmailChangePassword from './components/accounts/SendEmailChangePassword'
import PasswordReset from './components/accounts/PasswordReset'
import SearchProduct from './components/SearchProduct'

const App = () => {

  let token = getToken()
  const dispatch = useDispatch()

  dispatch( setUserToken({access_token : token.access_token}) )

  const { access_token } = useSelector(state => state.token)

  return  <>

  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Layout />} >
        <Route index element={<Products />} />
        <Route path='productdetail' element={<ProductDetail />} />
        <Route path='productfilter' element={<FilterProducts />} />
        <Route path='productsearch' element={<SearchProduct />} />

        {/* --------------------------------- */}

        <Route path='verify-email/:uid/:token' element={<VerifyEmail />} />
        <Route path='passwordreset/:uid/:token' element={<PasswordReset />} />

        <Route path='customer' element={ access_token ? <Customer /> : <Navigate to='/login' /> } />
        <Route path='passwordchange' element={ access_token ? <PasswordChange /> : <Navigate to='/login' /> } />
        <Route path='cart' element={ access_token ? <Cart /> : <Navigate to='/login' /> } />
        <Route path='orders' element={ access_token ? <Orders /> : <Navigate to='/login' /> } />
        <Route path='placeorder' element={ access_token ? <PlaceOrder /> : <Navigate to='/login' /> } />
        <Route path='signup' element={ !access_token ? <Signup /> : <Navigate to='/' /> } />
        <Route path='forgotpassword' element={ !access_token ? <SendEmailChangePassword /> : <Navigate to='/' /> } />
        <Route path='login' element={ !access_token ? <Login /> : <Navigate to='/' />} />
        
        {/* --------------------------------- */}

      </Route>

      <Route path='*' element={<h1>Error 404</h1>} />
      
    </Routes>
  </BrowserRouter>

  </>
}

export default App