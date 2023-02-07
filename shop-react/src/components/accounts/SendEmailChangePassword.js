import React from 'react'
import { useState } from 'react';
import { usePasswordresetemailMutation } from '../../sevices/MyShopApi'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SendEmailChangePassword = () => {

    const [successmsg, setSuccessmsg] = useState('')
    const [error, setError] = useState({})
    
    const [emailApi, res_email] = usePasswordresetemailMutation()
    
    const [userdata, setUserdata] = useState({
          email : ''
        })
  
    const handlechangedata = (e) => {
            setUserdata({
            ...userdata,
            [e.target.name] : e.target.value
          })
        }
  
    const handlesubmit = async (e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
  
          const actualData = {
          email : data.get('email'),
        }
    
        const res = await emailApi(actualData)
    
            if(res.error){
              setError(res.error.data.errors)
            }
    
            if(res.data){
              setError({})
              setSuccessmsg(res.data)
              setUserdata({
                email : ''
              })
            }
  
          }
  

  return (
    <>

    <h4 className='text-center mt-5'>Change Password</h4>
        
        <div class="d-flex justify-content-center mt-5">
    
        <form onSubmit={handlesubmit}>
          
        <div className="form-group">
            <label htmlfor="exampleInputEmail1">Email address</label>
            <input onChange={handlechangedata} value={userdata.email} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        
            {error ? <p style={{color:'red'}}>{error.email}</p> : <small></small>}
        
        </div>
          
         
            {error ? <p style={{color:'red', fontSize:'14px'}}>{error.non_field_errors}</p> : <small></small>}
    
          {
          res_email.isLoading ? <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> : <button type="submit" className="btn btn-primary">Send Email</button> 
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
    
        </>
  )
}

export default SendEmailChangePassword