import React from 'react'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './ProductCard';

import { useGetAllProductsQuery } from '../sevices/MyShopApi'

const Products = () => {

  const product = useGetAllProductsQuery()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>

<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
 
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/004/299/806/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/006/828/785/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-women-concept-free-vector.jpg" className="d-block w-100" alt="..." />
    </div>
  </div>

  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </a>

  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </a>

</div>



<div class="alert alert-dark text-center p-5 mt-3" role="alert">
    <h2>Laptops</h2>
</div>

    <div>

    <Carousel responsive={responsive}>

      {
        product.isSuccess ? product.data.laptop.map( (item, i) => <ProductCard mydata={item} /> ) : <h2>loading...</h2>
      }

    </Carousel>

    </div>

<div class="alert alert-dark text-center p-5 mt-3" role="alert">
    <h2>Mobiles</h2>
</div>

    <div>

    <Carousel responsive={responsive}>

      {
        product.isSuccess ? product.data.mobile.map( (item, i) => <ProductCard mydata={item} /> ) : <h2>loading...</h2>
      }

    </Carousel>

    </div>
    
    </>
  )
}

export default Products