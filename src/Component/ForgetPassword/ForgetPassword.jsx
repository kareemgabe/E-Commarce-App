import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();


  function forgetUserPassword(userEmail) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email:userEmail,
      })
      .then((response) => {
        console.log("pass", response);
        Navigate("/resetPassword");
        setIsLoading(true);
        return true;

      })
      .catch((erro) => {
        setIsLoading(false);
        console.log(erro);
        return false;
      });
      console.log(userEmail);
  }




const forgetFormik =useFormik({
   initialValues:{
    email:'',
   },
   onSubmit:forgetUserPassword,
  })
  return (
    <>
      {/* <Helmet>
        <title>ForgetPassword Component</title>
      </Helmet> */}
        <form onSubmit={forgetFormik.handleSubmit} action="">
      <div className="container w-75 mt-5">
        <h2 className="h4 fw-bold">please enter your verification code:</h2>
        <input
       onChange={forgetFormik.handleChange}  value={forgetFormik.values.email}
          className="form-control mt-1 py-3"
          placeholder="Email" id="email"
        />
        <div className={` buttonWidth`}>
          <button
       
            type="submit"
            className="btn btn-outline-success mt-4"
          >
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
      </div>
        </form>

    </>
  );
}
