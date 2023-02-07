import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Orders = () => {
  
  const api = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const { access_token } = useSelector(state => state.token)
  
  const [res, setres] = useState([])


  useEffect( () => {
      async function getUser() {
        try {
          const response = await api.get(`/checkout/${null}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.orderplaced)
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    },[])
    

    return (
    <>
    
<div className="container">
 <div className="row mt-5">
  <div className="col-sm-12">
    <h4>Order Summary</h4>
    <hr />

{
    res && res.length != 0 ? res.map( (item, i) =>

      <div className="card mb-2">
        <div className="card-body">
          <div class="float-end">{item.status}</div>
          <h5>{item.product.title}</h5>
          <p>Quantity: {item.quantity}</p>
          <p className="fw-bold">Price: {item.product.discounted_price}</p>
        </div>
      </div>

    ) : null 
}

  </div>

  </div>
</div>

    </>
  )
}

export default Orders