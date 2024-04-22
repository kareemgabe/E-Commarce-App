import axios from 'axios';
import React, { useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import { cartContextProduct } from '../../Context/CartContextPro';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from 'react-helmet';




export default function ProductDetails() {
  let{addProductToCart} =useContext(cartContextProduct)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



async function addProduct(id){
    // API => logic
 const res = await  addProductToCart(id);
 console.log(res);
 if(res.status === "success"){
   toast.success('Added Successfully',{duration:1500,position:'bottom-right'})
 }else{
    toast.error('Error occurred',{duration:1500,position:'top-right'})

 }
}

const {id} = useParams()
// console.log(id);




function getProductDetails(){
 return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ id }`)
}



const {isFetching,isLoading,data,isError}=useQuery(`productDetails-${id}`, getProductDetails )


if(isLoading){
    return<>      
     <div className="d-flex vh-100 bg-secondary bg-opacity-50 justify-content-center align-items-center">
       <ThreeDots
         visible={true}
         height="80"
         width="80"
         color="#fff"
         radius="9"
         ariaLabel="three-dots-loading"
         wrapperStyle={{}}
         wrapperClass=""
          />
      </div>
    </>

  }if(isError){
    // Navigate  => function Navigate
    return  <Navigate to='/product'  />
  }

  const productDetails =data.data.data;
  console.log(productDetails);
  return (<>
        <Helmet>
        <title>{productDetails.title} Product</title>
      </Helmet>
   <div className="container mt-5 text-center">
       <div className="row align-items-center m-auto">
        <div className="col-3">
           <figure>

           <Slider {...settings}>
           {productDetails.images.map((ele , indx)=>
             <img key={indx} className='w-100' src={ele} alt={productDetails.title} />
              )}
           </Slider>

           </figure>
        </div>
        <div className="col-9">
        <article>
            <h1 className='h5'>{productDetails.title}</h1>
            <p className="text-muted">{productDetails.description}</p>
            <h6>{productDetails.category.name}</h6>
            <div className="d-flex justify-content-between">
             <span>{productDetails.price} EGP</span>
             <span>
             <i className='fa-solid fa-star text-warning'></i>
                {productDetails.ratingsAverage}</span>
            </div>
            <button onClick={()=>addProduct(productDetails.id)}  className='mainBg w-100 border border-none rounded-3 py-2 text-white mt-2'>Add to cart +</button>
        </article>
        </div>
       </div>
    </div>
  </>

  )
}



