import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { usePasswordresetMutation } from '../../sevices/MyShopApi'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PasswordReset = () => {

    const dataurl = useParams()
    const [successmsg, setSuccessmsg] = useState('')
    const [error, setError] = useState({})
    
    const [changepasswordUserApi, res_changepassword] = usePasswordresetMutation()
      
    const [userdata, setUserdata] = useState({
          password : '',
          password2 : ''
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
          password : data.get('password'),
          password2 : data.get('password2')
        }
    
        const res = await changepasswordUserApi({actualData, dataurl})
    
            if(res.error){
              setError(res.error.data.errors)
            }
    
            if(res.data){
              setError({})
              setSuccessmsg(res.data)
              setUserdata({
                password : '',
                password2 : ''
              })
            }
  
          }
  

  return (
    <>

    <h4 className='text-center mt-5'>Change Password</h4>
        
        <div class="d-flex justify-content-center mt-5">
    
        <form onSubmit={handlesubmit}>
          
          <div className="form-group">
            <label htmlfor="exampleInputPassword1">Password</label>
            <input onChange={handlechangedata} value={userdata.password} name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
         
            {error ? <p style={{color:'red', fontSize:'14px'}}>{error.password}</p> : <small></small>}
    
          </div>
          
          <div className="form-group">
            <label htmlfor="exampleInputPassword1">Confirm Password</label>
            <input onChange={handlechangedata} value={userdata.password2} name='password2' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
         
            {error ? <p style={{color:'red', fontSize:'14px'}}>{error.password2}</p> : <small></small>}
            {error ? <p style={{color:'red', fontSize:'14px'}}>{error.non_field_errors}</p> : <small></small>}
    
          </div>
          
    
          {
          res_changepassword.isLoading ? <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> : <button type="submit" className="btn btn-primary">Change Password</button> 
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

export default PasswordReset