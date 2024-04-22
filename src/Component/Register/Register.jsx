import React, { useState } from 'react'
import { useFormik} from 'formik';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import * as Yup from 'yup';




export default function Register(){
const navigate =useNavigate();

const userData = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
};


const [isSuccess, setIsSuccess] = useState(false);
const [error, setErrMess] = useState(undefined);
const [isLoading, setIsLoading] = useState(false)



function mySubmit(values) {
setIsLoading(true);
  // console.log("submit", values);
axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
  .then((x)=>{
  //  console.log("in case of sucess x ", x);
   setIsSuccess(true)

   setIsLoading(false);



    setTimeout(() => {
   setIsSuccess(false)
      navigate('/login')
    }, 2000);


  }).catch((x)=>{

  // console.log("in case of error x",  x);
  setErrMess(x.response.data.message)
  setIsLoading(false);
  })


}






const registerFormik = useFormik({
  initialValues: userData,
  onSubmit: mySubmit,
  validate: function (values) {

      const errors = {};
      const nameRegex = /^[A-Z][a-z]{3,7}$/;
      if (nameRegex.test(values.name) === false) {
          errors.name = "Name must be from 4 to 8 characters and start with a capital letter";
      }
      if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
          errors.email = "Email must be in the correct format";
      }
      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (phoneRegex.test(values.phone) === false) {
          errors.phone = "Phone must be an Egyptian number";
      }
      if (values.password.length < 6 || values.password.length > 12) {
          errors.password = "Password must be at least 6 characters";
      }
      // Check if rePassword doesn't match the password
      if (values.rePassword !== values.password) {
          errors.rePassword = "Password and rePassword don't match";
      }

      return errors;
  },
// validationSchema
});


  return <>
      <Helmet>
        <title>Register Component</title>
      </Helmet>
    <div className="w-75 m-auto px-5 pb-5">


    { isSuccess ? <div className="alert alert-success mt-4 fw-bold text-center">
    congratuations your account has been created
    </div> : "" }
    

    {error? <div className="alert alert-danger mt-4 fw-bold text-center">
    {error}
    </div> : ""}
   

        <h2 className='my-4 fw-light'>Register Now:</h2>
        <form onSubmit={registerFormik.handleSubmit}>

          <div className="mb-3">
           <label htmlFor="name">Name:</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.name} autoComplete="username" id='name' type="text" className='form-control'/>
           {registerFormik.errors.name && registerFormik.touched.name ? <div className="alert alert-danger mb-3">{registerFormik.errors.name}</div>: ""}
          </div>


            <div className="mb-3">
            <label htmlFor="email">Email</label>
          <input  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} autoComplete="useremail" id='email' type="email" className='form-control'/>
          {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger mb-3">{registerFormik.errors.email}</div>: ""}

            </div>


           <div className="mb-3">
           <label htmlFor="phone">Phone</label>
          <input  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.phone} autoComplete="userphone" id='phone' type="tel" className='form-control'/>
          {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="alert alert-danger mb-3">{registerFormik.errors.phone}</div>: ""}   
           </div>
 

          <div className="mb-3">
            <label htmlFor="password">Password</label>
          <input  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} id='password' name="password" autoComplete="current-password" type="Password" className='form-control'/>
           {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger mb-3">{registerFormik.errors.password}</div>: ""}
          </div>


           <div className="mb-3">
           <label htmlFor="rePassword">rePassword</label>
          <input  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.rePassword} id='rePassword' autoComplete="current-password" type="password" className='form-control'/>
           {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="alert alert-danger mb-3">{registerFormik.errors.rePassword}</div>: ""}
           </div>

            <div className="buttonWidth position-relative">
              <button  type='submit' className='mainBg border-0 py-2 px-3 rounded-3 text-white position-absolute end-0'>
                {isLoading?<ColorRing
               visible={true}
               height="30"
              width="30"
              ariaLabel="color-ring-loading"
               wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff','#fff','#fff','#fff','#fff']}
              />: 'Register'}
                
              </button>
              </div>
        </form>
      
    </div>


  </>
}
