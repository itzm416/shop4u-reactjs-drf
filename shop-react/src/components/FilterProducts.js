import React, { useState } from 'react'
import { getCategory } from '../sevices/LocalStorageService'
import { useProductcategoryQuery } from '../sevices/MyShopApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../features/Category'
import ProductCard from './ProductCard';

const FilterProducts = () => {

    const category = getCategory()
    const dispatch = useDispatch()
    const [pricefilter, setfilter] = useState()
    
    dispatch( setCategory({prod_category : category}) )
    const prod_category = useSelector(state => state.category)

    const prod = {prod:prod_category,price:pricefilter}
    const res = useProductcategoryQuery(prod)
    
    const handlleclick = (e) => {
     setfilter(e)
    }

  return (
    <>

<div class="container text-center mt-4">
  <div class="row">

    <div class="col-sm-12 col-md-2 col-lg-2">
        <ul class="list-group">
          <li class="list-group-item">
                <a onClick={() => handlleclick('all')} role="button">All</a>
          </li>
          <li class="list-group-item">
                <a onClick={() => handlleclick('below')} role="button">Below 20000</a>
          </li>
          <li class="list-group-item">
                <a onClick={() => handlleclick('above')} role="button">Above 30000</a>
          </li>
        </ul>
    </div>

    <div class="col-sm-12 col-md-10 col-lg-10">
    {
        res.isSuccess ? Object.values(res.data)[0].map( (item, i) => <ProductCard mydata={item} /> ) : <h2>loading...</h2>
    }
    </div>

  </div>
</div>


    </>
  )
}

export default FilterProducts