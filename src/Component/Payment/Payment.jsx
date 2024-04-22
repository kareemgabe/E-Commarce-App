import axios from 'axios'
import React, { useContext } from 'react'
import { cartContextProduct } from '../../Context/CartContextPro';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik} from 'formik';
import * as Yup from 'yup';

// const mySchema =Yup.object({
//   city:Yup.string.required("City Must be required").min(2).max(30),
//   phone:Yup.string().required("Phone Must be required").matches(/^01[0125][0-9]{8}$/),
//   details:Yup.string().required('Details Must be required').string(),
// })
export default function Payment() {
const navigation = useNavigate();
  
  const {cartID, getUserCart,clearProduct} =  useContext(cartContextProduct)
  console.log(cartID);

  async  function confirmCashPayment(values){
        const shippingObject = {
            "shippingAddress":{
               values,
                }
        }
  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}` ,shippingObject,
      {
        headers:{token:localStorage.getItem('tkn')} 
       },
      ).then((response)=>{
        console.log(response);
        if(response.data.status === "success"){
           toast.success('payment complated successfully');
           getUserCart();
           clearProduct();
           setTimeout(()=>{
            navigation('/product')
           },1500)
        }
    }).catch((error)=>{
           console.log(error);
            toast.error('payment failed')
    
    })
    console.log(values);
    }

 async function confirmOnlinePayment(values){
      const shippingObject = {
          "shippingAddress":{
            values
              }
      }
   await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000` ,shippingObject,
    {
      headers:{token:localStorage.getItem('tkn')} 
     },
    {
      params:{
        url:'http://localhost:3000',
      }
    }
    ).then((response)=>{
      console.log(response);
      if(response.data.status === "success"){
        window.open(response.data.session.url, '_self')
      }
  }).catch((error)=>{
         console.log(error);
          toast.error('payment failed')
  
  })
  console.log(values);
  }

const paymentFormik = useFormik({
    initialValues:{
      city:'',
      phone:'',
      details:'',
    },
    onSubmit:confirmCashPayment
    ,onClick:confirmOnlinePayment,
    validationSchema:mySchema
  })

  return (<>
         <Helmet>
        <title>Payment Component</title>
      </Helmet>
      
      <form action="" onSubmit={paymentFormik.handleSubmit}>
      <div className="w-75 m-auto py-4">
        <label htmlFor="" className='mb-1'>City</label>
        <input onChange={paymentFormik.handleChange} type="text" id='city' placeholder='city...' className='form-control mb-3' value={paymentFormik.values.city}/>


        <label htmlFor="phone" className='mb-1'>Phone</label>
        <input onChange={paymentFormik.handleChange} type="text" id='phone' placeholder='phone...' className='form-control mb-3' value={paymentFormik.values.phone}/>


        <label htmlFor="details" className='mb-1'>Details</label>
        <textarea  onChange={paymentFormik.handleChange} name="details" id="details" rows='4' className='form-control mb-4' value={paymentFormik.values.details}></textarea>

        <button onClick={confirmCashPayment} className='btn btn-primary w-25 me-5'> Confirm Cash Payment</button>
        <button onClick={confirmOnlinePayment}  className='btn btn-outline-primary w-25'>Online Payment</button>
      </div>       
      </form>

   </>
  )
}
