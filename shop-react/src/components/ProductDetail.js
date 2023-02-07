import React from 'react'
import { NavLink } from 'react-router-dom'
import { getSlug } from '../sevices/LocalStorageService'
import { useGetAllProductsQuery } from '../sevices/MyShopApi'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ProductDetail = () => {

    const api = axios.create({
        baseURL : 'http://127.0.0.1:8000'
      })

    const { access_token } = useSelector(state => state.token)

    const slug = getSlug()
    const product = useGetAllProductsQuery(slug)

    const a = (e) =>{  
        async function getUser() {
          try {
            const query = 'add'
            const response = await api.get(`/cart/${e}/${query}/`,{headers : {'authorization' : `Bearer ${access_token}`}});
          } catch (error) {
            console.error(error);
          }
        }
        getUser()
      }

    return (
    <>

{ product.isSuccess ? 

<div className="card mb-3 mt-5 mx-2">
        <div className="row g-0">
            <div className="col-md-6">
            <img src={`http://127.0.0.1:8000/.${product.data.data.product_image}`} style={{width:'500px'}} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6">
            <div className="card-body">
                <h5 className="card-title">{product.data.data.title}</h5>
                <p className="card-text">{product.data.data.description}</p>
            </div>
          
          <div className='p-2'>
            <NavLink to="/cart">
                <a onClick={() => a(product.data.data.slug)} className="btn btn-primary" href="#" role="button">Add To Cart</a>
            </NavLink>    
            <NavLink to="/signup">
                <a className="btn btn-danger mx-2" href="#" role="button">Buy Now</a>
            </NavLink>
          </div>

            </div>
        </div>
    </div> : <h2>loading...</h2>
}

    </>
  )
}

export default ProductDetail