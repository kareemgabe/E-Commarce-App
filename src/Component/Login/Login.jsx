import React, { useContext, useState } from 'react'
import { useFormik} from 'formik';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { Nav } from 'react-bootstrap';
import loginStyle from './Login.module.css'
import { Helmet } from 'react-helmet';


export default function Login(){
const navigate =useNavigate();

let {setToken}= useContext(authContext);
const userData = {
  email: "",
  password: "",
};


const [isSuccess, setIsSuccess] = useState(false);
const [error, setErrMess] = useState(undefined);
const [isLoading, setIsLoading] = useState(false)





async function mySubmit(values) {
setIsLoading(true);
  // console.log("submit", values);

 let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  .then((x)=>{

    if(x.data.message == 'success'){

         console.log("Token: ", x.data.token);
         localStorage.setItem('tkn', x.data.token)
         setToken( x.data.token)
        setIsSuccess(true)
        setIsLoading(false);



    setTimeout(() => {
   setIsSuccess(false);
      navigate('/home');
    }, 2000);
    }



  }).catch((x)=>{

  // console.log("in case of error x",  x);
  setErrMess(x.response.data.message)
  setIsLoading(true);
  })
return res;

}






const registerFormik = useFormik({
  initialValues: userData,
  onSubmit: mySubmit,
  validate: function (values) {

      const errors = {};
      const nameRegex = /^[A-Z][a-z]{3,7}$/;
      if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
          errors.email = "Email must be in the correct format";
      }
      if (values.password.length < 6 || values.password.length > 12) {
          errors.password = "Password must be at least 6 characters";
      }

      return errors;
  }
});



  return <>
        <Helmet>
        <title> Login Component</title>
      </Helmet>
    <div className="w-75 m-auto px-5 pb-5">

    {  isSuccess ? <div className="alert alert-success mt-4 fw-bold text-center ">
      done
    </div> : ' ' }
    

    {error? <div className="alert alert-danger mt-4 fw-bold text-center">
    {error}
    </div> : ' ' }
   

        <h2 className='my-4 fw-light'>Login Now:</h2>
        <form onSubmit={registerFormik.handleSubmit}>


            <div className="mb-3">
            <label htmlFor="email">Email</label>
          <input   onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} autoComplete="useremail" id='email' type="email" className='form-control'/>
          {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger mb-3">{registerFormik.errors.email}</div>: ""}

            </div>

 

          <div className="mb-3">
            <label htmlFor="password">Password</label>
          <input  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} id='password' name="password" autoComplete="current-password" type="Password" className='form-control'/>
           {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger mb-3">{registerFormik.errors.password}</div>: ""}
          </div>

          <Nav.Link className={loginStyle.textMuted} as={Link} to="/forgetPassword">
           <p className='fw-bold'>Forget Your Password ?</p>   
          </Nav.Link>
          
  

            <div className={` buttonWidth bg-info position-relative`}>
              <button  type='submit' className='mainBg border-0 py-2 px-3 rounded-3 text-white position-absolute end-0'>
                {isLoading?<ColorRing
               visible={true}
               height="30"
              width="30"
              ariaLabel="color-ring-loading"
               wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff','#fff','#fff','#fff','#fff']}
              />: 'Login'}
                
              </button>
              </div>
        </form>
      
    </div>


  </>
}
