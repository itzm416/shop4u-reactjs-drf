import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCustomerMutation } from '../sevices/MyShopApi'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';

const Customer = () => {
  
  const api = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const [successmsg, setSuccessmsg] = useState('')
  const [error, setError] = useState({})
  
  const [customerApi, res_customer] = useCustomerMutation()


  const [res, setres] = useState([])
  const [r, setr] = useState([])
  
  useEffect( () => {
      async function getUser() {
        try {
          const response = await api.get('customer/address/',{headers : {'authorization' : `Bearer ${access_token}`}});
          setres(response.data.state)
          setr(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    },[])
    
  const [userdata, setUserdata] = useState({
        first_name : '',
        last_name : '',
        locality : '',
        city : '',
        zipcode : '',
        state : ''
      })

  const handlechangedata = (e) => {
          setUserdata({
          ...userdata,
          [e.target.name] : e.target.value
        })
      }
      
  const { access_token } = useSelector(state => state.token)
  

  const handlesubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
          user : '',
          first_name : data.get('first_name'),
          last_name : data.get('last_name'),
          locality : data.get('locality'),
          city : data.get('city'),
          zipcode : data.get('zipcode'),
          state : data.get('state')
      }
      const res = await customerApi({actualData, access_token})
          if(res.error){
            setError(res.error.data.errors)
          }
  
          if(res.data){

            async function getUser() {
              try {
                const response = await api.get('customer/address/',{headers : {'authorization' : `Bearer ${access_token}`}});
                setres(response.data.state)
                setr(response.data.data)
              } catch (error) {
                console.error(error);
              }
            }
            getUser()

            setError({})
            setSuccessmsg(res.data)
            setUserdata({
              first_name : '',
              last_name : '',
              locality : '',
              city : '',
              zipcode : '',
              state : ''
            })

          }

        }

      const handlestate = (e) => {
        console.log(e.target.value)
        setUserdata({
          ...userdata,
          [e.target.name] : e.target.value
        })
      }

  return (
    <>


<div class="container mt-3">


<div class="container">
  <div class="row">
  
    <div class="col-sm-12 col-md-6">

<h4 className='text-center mt-5'>Customer</h4>

    <form onSubmit={handlesubmit}>

<div className="form-group">
  <label htmlfor="exampleInputEmail1">First Name</label>
  <input onChange={handlechangedata} value={userdata.first_name} type="text" name='first_name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
 
  {error ? <p style={{color:'red'}}>{error.first_name}</p> : <small></small>}

</div>

<div className="form-group">
  <label htmlfor="exampleInputPassword1">Last Name</label>
  <input onChange={handlechangedata} value={userdata.last_name} name='last_name' type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" />

  {error ? <p style={{color:'red', fontSize:'14px'}}>{error.last_name}</p> : <small></small>}

</div>

<div className="form-group">
  <label htmlfor="exampleInputPassword1">Locality</label>
  <input onChange={handlechangedata} value={userdata.locality} name='locality' type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" />

  {error ? <p style={{color:'red', fontSize:'14px'}}>{error.locality}</p> : <small></small>}

</div>

<div className="form-group">
  <label htmlfor="exampleInputPassword1">City</label>
  <input onChange={handlechangedata} value={userdata.city} name='city' type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" />

  {error ? <p style={{color:'red', fontSize:'14px'}}>{error.city}</p> : <small></small>}

</div>

<div className="form-group">
  <label htmlfor="exampleInputPassword1">Zipcode</label>
  <input onChange={handlechangedata} value={userdata.zipcode} name='zipcode' type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" />

  {error ? <p style={{color:'red', fontSize:'14px'}}>{error.zipcode}</p> : <small></small>}

</div>

<label htmlfor="exampleInputPassword1">State</label>

<select class="form-select mb-3" value={userdata.state} onChange={handlestate} name='state' aria-label="Default select example">
  {
  res && res.length != 0 ? res.map((item)=>{
    return(
    <option value={item[0]}>{item[0]}</option>
    )

  }) : <h2>error</h2>

}
</select>

{
res_customer.isLoading ? <div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div> : <button type="submit" className="btn btn-primary">Save</button> 
}

{
  successmsg ? <div className="alert alert-success p-1 text-center mt-4" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
  </svg>
  {successmsg.msg}
  </div> : <span></span>
}


</form>
    </div>
  
    <div class="col p-1">

    <h4 className='text-center mt-5 mb-4'>Address</h4>

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

    </div>
  
  </div>
</div>









</div>


    </>
  )
}

export default Customer