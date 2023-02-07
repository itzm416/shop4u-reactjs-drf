import React from 'react'
import { NavLink } from 'react-router-dom';
import { storeSlug } from '../sevices/LocalStorageService'

const ProductCard = (props) => {
  
  const handleClick = (e) => {
    storeSlug(e)
  }

  return (
    <>

<div key={props.mydata.id} className="card text-center">
      <NavLink to="/productdetail">
        <img src={`http://127.0.0.1:8000/.${props.mydata.product_image}`} style={{height:'200px', width:'200px'}} onClick={() => handleClick(props.mydata.slug)} className="card-img-top" alt="..." />
        </NavLink>
  <div className="card-body">
    <h5 className="XXXXXX-title">{props.mydata.title}</h5>
    <h5 className="XXXXXX-title">RS {props.mydata.discounted_price}</h5>
  </div>
</div>

    </>
  )
}

export default ProductCard