import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';

export const cartContextProduct =createContext();

export default function CartContextPro({children}) {


  const {myToken}=useContext(authContext);


    // shared allState
    const [numOfCartItems, setnumOfCartItems] = useState(0);
    const [totalCartPrice, settotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState(null);
    const [cartID, setCartID] = useState(0);

    console.log("cartId",cartID);


    async function addProductToCart(productId){
        try{
           const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            "productId": productId
           },
           {
            headers:{token:localStorage.getItem('tkn')} 
           });
           getUserCart();
           return data;
        }
        catch( e ){
         console.log(e);
        }
    }

async function getUserCart(){
      await  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{token:localStorage.getItem('tkn')} 
           }).then((res)=>{
          // console.log("response",res.data.data.cartOwner);
          localStorage.setItem("cartOwner",res.data.data.cartOwner);
          setCartID(res.data.data._id);
          setnumOfCartItems(res.data.numOfCartItems);
          settotalCartPrice(res.data.data.totalCartPrice);
          setAllProducts(res.data.data.products);
        })
        
        .catch((err)=>{
          // console.log('err',err);
        })
    }
     
 async function deleteProduct(id){
     const res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token:localStorage.getItem('tkn')
        } 
       }).then((response)=>{
        // console.log(response);
        settotalCartPrice(response.data.data.tolalCartPrice);
        setnumOfCartItems(response.data.numOfCartItems);
        setAllProducts(response.data.data.products);

        return true;
       }).catch((error)=>{
        // console.log(error);
        return false;
       })

       return res;
    }





    async function clearProduct(){
      const response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{
         headers:{
           token:localStorage.getItem('tkn')
         } 
        }).then((response)=>{
         console.log(response);
         settotalCartPrice(0);
         setnumOfCartItems(0);
         setAllProducts([]);
         
         return true; 
        }).catch((error)=>{
         console.log(error);
         return false;
        })
 
        return response;
     }




  async  function updateCount( id , newCount ){
    const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          "count" : newCount
      },{
        headers:{
          token:localStorage.getItem('tkn')
        } 
      }).then((response)=>{     
            // console.log(response);
            settotalCartPrice(response.data?.data.tolalCartPrice);
            setnumOfCartItems(response.data.numOfCartItems);
            setAllProducts(response.data.data.products);
            return true;
      }).catch((err)=>{
        console.log('err',err);
        return false
      })
     return booleanFlag;
      }



    useEffect(() => {
        getUserCart();
    }, [myToken])
    
  return  <>
  <cartContextProduct.Provider value={{addProductToCart,
                                       numOfCartItems,
                                       totalCartPrice,
                                        allProducts,
                                        cartID,
                                        updateCount,
                                        deleteProduct,
                                        clearProduct,
                                        getUserCart
}}>
     {children}  
    </cartContextProduct.Provider>
    </>
 }

