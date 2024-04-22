import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {
   const [isLoading, setIsLoading] = useState(false)

    const Navigate = useNavigate()

        function resetUserPassword(message){
           axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
        }).then((response)=>{
            setIsLoading(true);
              console.log(response);
              Navigate('/resetAccount')
        }).catch((erro)=>{
            setIsLoading(false);
            console.log(erro);
        })
        console.log(message);
      
      }
    
        const resetFormik =useFormik({
          initialValues:{
           code:'',
          },
          onSubmit:resetUserPassword,
         }) 
    

    
      return (
    <>
      <Helmet>
        <title>ResetPassword Component</title>
      </Helmet>
    <form  onSubmit={resetFormik.handleSubmit} action="">
    <div  className="container w-75 mt-5">
            <h2 className='h4 fw-bold'>reset your account password:</h2>
            <input onChange={resetFormik.handleChange} className='form-control mt-1 py-3' placeholder='Code' id='code' />
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
              "Verify"
            )}
              </button>
    </div>
     </form>
    </>
      )
}
