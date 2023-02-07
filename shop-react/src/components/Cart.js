import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  
  const api = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const { access_token } = useSelector(state => state.token)
  
  const [res, setres] = useState([])
  const [price, setprice] = useState({
    amount:'',
    total:''
  })

  useEffect( () => {
      async function getUser() {
        try {
          const response = await api.get(`/cart/${null}/${null}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.cart)
          setprice({amount:response.data.amount,total:response.data.total})          
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    },[])
  
    const a = (e) =>{
      const d = `${e.id}:${e.product.slug}`
      async function getUser() {
        try {
          const query = 'remove'
          const response = await api.get(`/cart/${d}/${query}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.cart)
          setprice({amount:response.data.amount,total:response.data.total})
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    }

    const handleclickplus = (e) =>{
      const d = `${e.id}:${e.product.slug}`
      async function getUser() {
        try {
          const query = 'plus'
          const response = await api.get(`/cart/${d}/${query}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.cart)
          setprice({amount:response.data.amount,total:response.data.total})
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    }
    
    const handleclickminus = (e) =>{
      const d = `${e.id}:${e.product.slug}`
      async function getUser() {
        try {
          const query = 'minus'
          const response = await api.get(`/cart/${d}/${query}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.cart)
          setprice({amount:response.data.amount,total:response.data.total})
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    }

    return (
    <>
    
<div className="container my-5">
 <div className="row">
  <h1 className="text-center mb-5">Shopping Cart</h1>
  <div className="col-sm-8">
  <div className="card">
   <div className="card-body">
    <h3>Cart</h3>

   {
        res && res.length != 0 ? res.map( (item, i) => 

    <div key={i} className="row mt-3">
     <div className="col-sm-3 text-center align-self-center"><img src={`http://127.0.0.1:8000/.${item.product.product_image}`} alt="" srcset="" className="img-fluid img-thumbnail shadow-sm" height="150" width="150" /> </div>
     <div className="col-sm-9">
      <div>
       <h5>{item.product.title}</h5>
       <p className="mb-2 text-muted small">{item.product.description}</p>
       <div className="my-2">
        <label for="quantity">Quantity:</label>
        <a className="plus-cart btn mb-1" onClick={() => handleclickminus(item)}>-</a>
          <span id="quantity">{item.quantity}</span>
        <a className="minus-cart btn mb-1" onClick={() => handleclickplus(item)}>+</a>
       </div> 
       <div className="d-flex justify-content-between">
        <a onClick={() => a(item)} className="btn btn-sm btn-secondary mr-3">Remove item </a>
        <p className="mb-0"><span><strong>Rs.{item.product.discounted_price}</strong></span></p>
       </div>
      </div>
     </div>
    </div>

) : <h2>Empty</h2>
}


   </div>
   </div>
  </div>

  <div className="col-sm-4">
   <div className="card">
    <div className="card-body">
      <h3>The Total Amount of</h3>
      <ul className="list-group">
       <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Amount<span>Rs. {price.amount}</span></li>
       <li className="list-group-item d-flex justify-content-between align-items-center px-0">Shipping<span>Rs. 70.00</span></li>
       <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
        <div>
           <strong>Total</strong> <small>(including VAT)</small>
         </div>
         <span><strong>Rs. {price.total}</strong></span>
       </li>
      </ul>

      <NavLink to="/placeorder" className='text-decoration-none'>
      <div className="d-grid">
        <a className="btn btn-primary">
          Place Order
        </a>
        </div>
      </NavLink>  

    </div>
   </div>
  </div>
  
 </div>
</div>
        
    </>
  )
}

export default Cart