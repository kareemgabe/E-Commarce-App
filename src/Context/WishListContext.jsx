import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { authContext } from './AuthContext';
import { logDOM } from '@testing-library/react';

export const wishContext= createContext();


// WishContext.Provider 
export default function WishListContext({children}) {
    const [allProductsInWishlist, setAllProductsInWishlist] = useState(null);

    const {myToken} =useContext(authContext);
  
    async function addProductToWishList(productId){
  
       try{
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
         "productId": productId
        },
        {
         headers:{token:localStorage.getItem('tkn')} 
        });
  
        return data;
     }
     catch( e ){
      console.log(e);
     }
      }
  
  
 async function getProductToWishList(){
  await  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers:{token:localStorage.getItem('tkn')}
    }).then((response)=>{
         console.log("responseWish",response);
         setAllProductsInWishlist(response?.data?.data)
    }).catch((error)=>{
       console.log(error);
    })
   }
  
    async  function deleteFromWishList(productId){
      const response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,   {
          headers:{token:localStorage.getItem('tkn')} 
     }).then((response)=>{
        console.log("delete");
        setAllProductsInWishlist(response?.data?.data)
      return true;
     }).catch((error)=>{
      console.log(error);
      return false;
     })
     return response;
      }
  
      useEffect(() => {
        console.log("getting WishList");
        getProductToWishList()
      }, [myToken])


  return (
   <>
   <wishContext.Provider value={{allProductsInWishlist,addProductToWishList,deleteFromWishList}}>
   {children}
   </wishContext.Provider>
   </>
  )
}
