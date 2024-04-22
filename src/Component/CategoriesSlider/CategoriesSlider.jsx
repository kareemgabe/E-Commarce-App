import axios from "axios";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategoriesSlider() {

   function getCategories(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    };


  let {data,isLoading} =useQuery('CategoriesSlider', getCategories);

  console.log('data',data?.data.data);
  if(isLoading){
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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container my-5">
      <Slider {...settings}>
          {data.data.data.map((category,indx)=> <div key={indx}>
            <img style={{height:'200px'}} className="w-100" src={category.image} alt={category.name}/>
            </div>)}
      </Slider>
    </div>
  );
}

export default CategoriesSlider;
