import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getid, removeid, storeid } from '../sevices/LocalStorageService';

const PlaceOrder = () => {
  
  const api = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const { access_token } = useSelector(state => state.token)
  
  const [res, setres] = useState([])
  const [id, setid] = useState(null)
  const [r, setr] = useState([])
  
  const [c, setc] = useState(false)
  
  const [price, setprice] = useState({    
    amount:'',
    total:''
  })

  const p = price.total
  
  useEffect( () => {
    removeid()
    async function getUser() {
        try {
          const response = await api.get(`/palceorder/${null}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.cart)
          setprice({amount:response.data.amount,total:response.data.total})    
          setr(response.data.customer)
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    },[])
    

    const navigate = useNavigate(); 
    
    const handlechangedata = (e) => {
      setid(e)
    }
    
    const [payment, setpayment] = useState(true)
    
    const handlechange = () => {
      async function getUser() {
        try {
            const uid = getid()
            const response = await api.get(`/checkout/${uid}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
            if (uid==null){
              setc(true)
            }else{
              setc(false)
              removeid()
              navigate("/orders");
            }
            
          } catch (error) {
            console.error(error);
          }
        }
        getUser()
      }
      
      const change = () => {
        if (id==null){
        setc(true)
      }else{
        storeid(id)
        setc(false)
        setpayment(false)
      }
    }

    return (
    <>
    
<div className="container">
 <div className="row mt-5">
  <div className="col-sm-6">
    <h4>Order Summary</h4>
    <hr />

{
    res && res.length != 0 ? res.map( (item, i) =>

      <div className="card mb-2">
        <div className="card-body">
          <h5>{item.product.title}</h5>
          <p>Quantity: {item.quantity}</p>
          <p className="fw-bold">Price: {item.product.discounted_price}</p>
        </div>
      </div>

    ) : null 
}

<p className="fw-bold">Total Cost + Rs.70.0 = {price.total}</p>

    <small>Term and Condition: Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ullam saepe! Iure optio repellat dolor velit, minus rem. Facilis cumque neque numquam laboriosam, accusantium adipisci nisi nihil in et quis?</small>
  </div>


  <div className="col-sm-4 offset-sm-1">
    <h4>Select Shipping Address</h4>
    <hr />

{
    r && r.length != 0 ? r.map( (item, i) =>

    <div key={i}>

        <div className="card">
          <div className="card-body">
          <h5>{item.first_name} {item.last_name}</h5>
          <p></p>
          </div>
        </div>

        <div class="form-check">
        <input class="form-check-input" type="radio" onClick={() => handlechangedata(item.id)} name="flexRadioDefault" id="flexRadioDefault1" />
          <label class="form-check-label" for="flexRadioDefault1">
                Address: {item.locality} {item.state} {item.city}
          </label>
        </div>

    </div>

    ) : null 
}


{
  payment == true ? 
        <div className="text-end mb-3">
          <button type="submit" onClick={() => change()} className="btn btn-warning mt-3 px-5 fw-bold">Continue</button>
        </div> : 


<PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: p,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        handlechange()
                        alert(`Transaction completed by ${name}`);
                      });
                    }}
            />
</PayPalScriptProvider>

}

        {c==true ? <>
        <small style={{ color:'red' }}>Customer address not found ! create a new customer address</small>
          <NavLink to="/customer" style={{ textDecoration: 'none', color:'blue' }}> Click here</NavLink> 
        </> : null
        }

    </div>


  </div>
</div>


    </>
  )
}

export default PlaceOrder