import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ResetAccount() {
  const [isLoading, setIsLoading] = useState(false)

    const Navigate = useNavigate()

    function resetAccount( userEmail, newPassword ){
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
            
                "email": userEmail ,
                "newPassword": newPassword ,
            
        }).then((response)=>{
              console.log(response);
              Navigate('/product')
        }).catch((erro)=>{
            console.log(erro);
        })
        console.log(userEmail,newPassword);
    }
    

   let accountFormik = useFormik({
    initialValues:{
      resetEmail:'',
      resetNewPassword:'',
    },
    onSubmit:resetAccount,
   })
    
    
      return (
    <>
        <Helmet>
        <title>ResetPassword Component</title>
      </Helmet>
    <form onSubmit={accountFormik.handleSubmit} action="">
          <div className="container w-75 mt-5">   
            <h2 className='h4 fw-bold'>reset your account password:</h2>
            <input onChange={accountFormik.handleChange} className='form-control mt-1 py-3' placeholder='Email' id='resetEmail' />
            <input onChange={accountFormik.handleChange} className='form-control mt-3 py-3' placeholder='New Password' id='resetNewPassword'/>
            <button type="submit" className='btn btn-outline-success mt-4'>
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Reset Password"
            )}
              </button>
           </div>
    </form>

    </>
      )
}
  

