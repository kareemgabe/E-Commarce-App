import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import {ThreeDots } from 'react-loader-spinner';

export default function AllOrders() {
  
  const [allOrders, setallOrders] = useState(null)
  function getUserOrders(){
    const UserID=localStorage.getItem('cartOwner');
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserID}`).
    then((response)=>{
      console.log(response.data);
      setallOrders(response.data)
    }).catch((error)=>{
      console.log(error);
    })
  }


  useEffect(() => {
  getUserOrders()
  }, [])
  
  if(!allOrders){
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
  }
    
  return (<>
          <Helmet>
        <title>AllOrders Component</title>
      </Helmet>
  <div className="container">
    <div className="row g-4 my-5 ">
      {allOrders &&allOrders.map((order ,idx)=>
       <div key={idx} className="col-md-6">
        <div className="orderInfo h-100">
        <div className="card border-success mb-3">

            <div className="card-body">
              <div className="container">
                <div className="row">
                  {order.cartItems.map((item,setIndex)=>{
                    console.log("items",item);
                    return <div key={setIndex} className="col-md-4">
                    <div className="montage h-100">
                      <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                         <h5 className='ms-1 font-md mt-3'><span className="text-main"> price:</span>{item.price} EGP</h5>
                         <h5 className='ms-1 font-md' >   <span className="text-main"> Count:</span>


                         {item.count}</h5>
                    </div>
                  </div>
                  } 
                    
                  )}
                </div>
              </div>
              <div className="deatails ms-3 d-flex justify-content-between align-items-center">
                <div className="method">
                  <h5 className="card-title font-md"> <span className="text-main">Payment Method:  </span>{order.paymentMethodType}</h5>
                   <p className="card-text font-md">  <span className="text-main">Order Price :</span> {order.totalOrderPrice}</p>
                </div>

                 <div className="address">
                 <h5 className="card-title font-md"> <span className="text-main">This Order is Delivering to </span> {order.shippingAddress.city}</h5>
                 <h5 className="card-title font-md"> <span className="text-main">on phone number :  </span>{order.shippingAddress.phone}</h5>
                 <h5 className="card-title font-md"> <span className="text-main">with details:  </span> {order.shippingAddress.details}</h5>

             
               
          
              </div>


                 </div>


         </div>
  
          </div>
        </div>
      </div>
      )}
 
    </div>
  </div>
   </>
  )
}
