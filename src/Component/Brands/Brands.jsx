import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { RotatingLines, ThreeDots } from 'react-loader-spinner';

export default function Brands() {

  const [allBrands, setAllBrands] = useState(null)

  function  getAllBrands() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    .then((response)=>{
      console.log(response.data.data);
      setAllBrands(response.data.data)
       }).catch((error)=>{
       console.log(error)
       })
  
  }
  useEffect(() => {
    getAllBrands();
    }, [])

    


if (!allBrands){
  return<> 
      <Helmet>
        <title>Brand Copmonent</title>
      </Helmet>     
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

  return ( <>
      <div className="container my-5 body">
        <h1 className='text-main fw-bold text-center mb-4'>ALL BRANDS</h1>

      <div className="row g-4">
        {allBrands && allBrands.map((brand,index)=>  <div key={index} className="col-md-3">
                  <div type="button" className="card product" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                  <img className='card-img-top' src={brand.image} alt="" /> 
                     <div className="card-body">
                     <h3 className=' text-center h6'>{brand.name}</h3>
                    </div>
                      </div>  
                </div>

                
        )}

      </div>

      {allBrands && allBrands.map((brand,index)=>
            <div key={index} className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
            <div className="modal-dialog">
           <div className="modal-content">
          <div className="modal-header">
          <h1 className="modal-title fs-5" id={`exampleModalLabel${index}`}></h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="title ms-3">
              <h2 className='h1 text-main'>{brand.name}</h2>
              <p  className='text-muted'>{brand.name}</p>
            </div>

           <img className='w-50'  src={brand.image} alt="" />
          </div> 
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
        </div> 
      )}











    </div>


  </>
  )
}













