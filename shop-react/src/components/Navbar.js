import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { unSetUserToken } from '../features/UserToken'
import { setCategory } from '../features/Category'
import { setsearchquery } from '../features/SearchQuery'
import { removeToken, storeCategory, storeSearch, getsearch } from '../sevices/LocalStorageService'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const { access_token } = useSelector(state => state.token)
  
  // console.log(searchquery)
  let x = getsearch()
  
  const dispatch = useDispatch()
  dispatch( setsearchquery({searchquery : x}) )

  const handlleclick = () => {
    dispatch( unSetUserToken({access_token : null}) )
    removeToken()
  }
  
  const handlleclick1 = (e) => {
    storeCategory(e)
    dispatch( setCategory({prod_category : e}) )
  }

  const [userdata, setUserdata] = useState({
    search : ''
  })

  const handlechangedata = (e) => {
      setUserdata({
      ...userdata,
      [e.target.name] : e.target.value
    })
  }

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault()

        storeSearch(userdata.search)
        dispatch( setsearchquery({searchquery : userdata.search}) )
        navigate("/productsearch");
        setUserdata({
          search:''
        })

    }

  return (
    <>
    
    <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">

  <NavLink to="/" style={{paddingLeft:'20px', paddingRight:'20px', textDecoration: 'none', color:'white'}}>Shop4u</NavLink>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
  
       
       <div className='px-2'>
        <NavLink to="/" style={{ textDecoration: 'none', color:'white'}}>Home</NavLink>
       </div>
       <div className='px-2'>
        <NavLink to="/productfilter" onClick={() => handlleclick1('Mobile')} style={{ textDecoration: 'none', color:'white'}}>Mobile</NavLink>
       </div>
       <div className='px-2'>
        <NavLink to="/productfilter" onClick={() => handlleclick1('Laptop')} style={{ textDecoration: 'none', color:'white'}}>Laptop</NavLink>
       </div>
    
      </ul>

      <form onSubmit={handlesubmit} className="d-flex mb-2 mt-2" role="search">
        <input className="form-control me-2" onChange={handlechangedata} value={userdata.search} name='search' type="search" placeholder="Search" aria-label="Search" />
      </form>

      {/* ----------------login signup------------------------------ */}

      { access_token ? <>
          
          <NavLink to="/cart">
              <a className="btn btn-danger mx-2" href="#" role="button">Cart</a>
          </NavLink>

          <div className="dropdown p-2">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </button>
          <ul className="dropdown-menu">
            <li className='mx-3'>
                <NavLink to="/customer" className='text-decoration-none'>
                  Customer
                </NavLink>
            </li>
            <li className='mx-3'>
                <NavLink to="/orders" className='text-decoration-none'>
                  Order
                </NavLink>
            </li>
            <li className='mx-3'>
                <NavLink to="/passwordchange" className='text-decoration-none'>
                  Password Change
                </NavLink>
            </li>
          </ul>
        </div>
                        
          <NavLink to="/login">
              <a onClick={() => handlleclick()} className="btn btn-secondary mx-2" href="#" role="button">Logout</a>
          </NavLink>
          
           </> : <>
          <NavLink to="/login">
                <a className="btn btn-success" href="#" role="button">Login</a>
            </NavLink>    
          <NavLink to="/signup">
              <a className="btn btn-secondary mx-2" href="#" role="button">Signup</a>
          </NavLink>
        </>
      }

      {/* ---------------------------------------------- */}

    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar