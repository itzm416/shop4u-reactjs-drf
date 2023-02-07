import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { storeSlug } from '../sevices/LocalStorageService'
import { useProductsearchMutation } from '../sevices/MyShopApi'
import ProductCard from './ProductCard'

const SearchProduct = () => {

    const { searchquery } = useSelector(state => state.searchquery)

    const [searchApi, res_search] = useProductsearchMutation()
    
      const [res, setres] = useState([])

      const handleClick = (e) => {
        storeSlug(e)
      }
    

useEffect( () => {
    async function getUser() {
        try {
            const r = await searchApi({'search':searchquery})
            setres(r.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  },[])

  useEffect( () => {
    async function getUser() {
        try {
            const r = await searchApi({'search':searchquery})
            setres(r.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  },[searchquery])

  return (
    <>

<div class="container text-center mt-4">
  <div class="row">

    <div class="col-sm-12 col-md-12 col-lg-12">

    {
    res_search.isSuccess && res.length != 0 ? res.map((item)=>{
        return(
            <div key={item.id} className="card text-center">
            <NavLink to="/productdetail">
            <img src={`http://127.0.0.1:8000/.${item.product_image}`} style={{height:'200px', width:'200px'}} onClick={() => handleClick(item.slug)} className="card-img-top" alt="..." />
                </NavLink>
            <div className="card-body">
                <h5 className="XXXXXX-title">{item.title}</h5>
                <h5 className="XXXXXX-title">RS {item.discounted_price}</h5>
            </div>
            </div>
            )
  }) : <h2>error</h2>
}

    </div>

  </div>
</div>


    </>
  )
}

export default SearchProduct