import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import {  ThreeDots } from 'react-loader-spinner';
import { cartContextProduct } from '../../Context/CartContextPro';
import { Helmet } from 'react-helmet';
import { wishContext } from '../../Context/WishListContext';

export default function WishList() {
 const {addProductToCart } = useContext(cartContextProduct);
 const {allProductsInWishlist,deleteFromWishList}= useContext(wishContext);
console.log("allProductsInWishlist",allProductsInWishlist);


 async function addProduct(id){
  const res= await addProductToCart(id);
  console.log("Response from ProductPage",res);
  if(res){
    toast.success('success',{Position:'bottom-left'})
   }else{
    toast.error('Error Ocupp',{Position:'bottom-left'})
   }
 }



 
 async function removeProduct(id){
  const res = await deleteFromWishList(id);
  console.log(res);
  if (res) {
    toast.success("product delete successfully", { position: "top-left" });

  } else {
    toast.error("Error occurred", { position: "top-center" });
  }
 }
 
if(!allProductsInWishlist){
  return (
    <>
      <div className="d-flex vh-100 bg-secondary bg-opacity-50 justify-content-center align-items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperClass=""
        />
      </div>
    </>
  );
}
  return <>
        <Helmet>
        <title>WishList Component</title>
      </Helmet>
   
        <div className="container bg-body-tertiary my-5 p-5">
    <h2 className="fw-bold h2">My wish List :</h2>

    {allProductsInWishlist &&
      allProductsInWishlist.map((product, indx) => (
        <div
          key={indx}
          className="row align-items-center border-bottom border-1 border-secondery p-3 bg-light  fw-normal mx-1 pt-3"
        >
          <div className="col-md-1">
            <figure>
              <img
                className="w-100"
                src={product.imageCover}
                alt={product.title}
              />
            </figure>
          </div>
          <div className="col-md-9">
            <article>
              <h3 className="h4">{product.title}</h3>
              <h5 className="h5 mainColor">Price: {product.price} EGP</h5>

              <div
                
                className="h6 text-danger fw-light"
              >
                <div onClick={()=> removeProduct(product.id)}  className="d-flex cursor-pointer">
                <i className="fa-solid fa-trash-can me-2 text-danger"></i>
                  <span>Remove</span>

                </div>
                
                
              </div>

            </article>
          </div>


          <div className="col-md-2">
            <button  
            onClick={()=> addProduct(product.id)} 
            className='btn btn-outline-success'>Add Product</button>
          </div>

        </div>
      ))}

  </div>

 
  </>
}
