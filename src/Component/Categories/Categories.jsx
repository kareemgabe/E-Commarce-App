import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import categoryStyle from './Categories.module.css';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null)

  function  getAllCategories() {
      return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
     .then((response)=>{
         console.log(response.data.data);
         setAllCategories(response.data.data)
     }).catch((error)=>{
    console.log(error)
     })
  } 

  function getDetailsCategories(id){
    // return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    // .then((res)=>{
    //   console.log("categoriesData",res);
    // })
    console.log("catagory id",id);
  }


useEffect(() => {
  getAllCategories()
}, [])



if(!allCategories){
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

 
  return (
    <>
      <Helmet>
        <title>Categories Component</title>
      </Helmet>
    <div className="container my-5">
      <div className="row g-4">
        {allCategories && allCategories.map((category,index)=>{
               return   <div key={index} className="col-md-4">
                  <div className="card product" onClick={()=> getDetailsCategories(category._id)}>
                  <img className={`w-100 ${categoryStyle.image}`}  style={{height:'300px'}} src={category.image} alt={category.name} /> 
                     <div className="card-body">
                     <h3 className='mainColor text-center'>{category.name}</h3>
                    </div>
                      </div>
                </div>
        })}

        
      </div>
      {/* <div className="row">
        <h2 className='text-center mt-4 text-main fw-bold'>Men's Fashion subcategories</h2>
        <div className="col-md-4">
           <div className="card product p-4">
            
            <h5 className='h3 fw-bold text-center'>Bags & luggage</h5>
                 
           </div>
        </div>
      </div> */}
    </div>
    </>
  )
}
