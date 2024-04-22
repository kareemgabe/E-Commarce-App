import React, { useContext } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import SimpleSlider from '../HomeSlider/HomeSlider';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContextProduct } from '../../Context/CartContextPro';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishContext } from '../../Context/WishListContext';

export default function Home() {
  const {addProductToCart} = useContext(cartContextProduct);
  const {addProductToWishList}=useContext(wishContext);

 async function addWishList(id){
  const res= await addProductToWishList(id);
  if(res){
    toast.success('it has been successfully added',{Position:'top-left'})
   }else{
    toast.error('Error Ocupp',{Position:'bottom-left'})
   }

 }

 async function addProduct(id){
  const res= await addProductToCart(id);
  if(res){
    toast.success('it has been successfully added',{Position:'bottom-left'})
   }else{
    toast.error('Error Ocupp',{Position:'bottom-left'})
   }
 }


  function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  };



  const {data,isLoading} = useQuery( 'getAllProducts', getAllProducts ,{

   });
  console.log("data",data?.data.data);

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
  return (
   <>
         <Helmet>
        <title>Home Component</title>
      </Helmet>
     <Container className='m-auto my-5'>
<div className="container">
<div className="row g-0">
<div className="col-md-10">
<SimpleSlider/>
</div>
<div className="col-md-2">
<img style={{height:"150px"}} className='w-100' src={require('../../assets/finalProject assets/images/grocery-banner-2.jpeg')} alt="" />
<img style={{height:"150px"}} className='w-100' src={require('../../assets/finalProject assets/images/grocery-banner.png')} alt="" />
</div>
</div>
  </div>

  <CategoriesSlider/>

     <div className="my-5 w-75 m-auto pt-5">
     <input type="text" className='form-control ' placeholder='Search...'/>
     </div>


    <Row className='g-4'>
     
      {data?.data.data.map((product,idx)=> {
        // console.log("product",product.id);
        return <Col key={idx} xs={4} md={3}>    
      
     <div className="product pb-4">
            
              <Link to={`/ProductDetails/${product.id}` }>

               <figure >
              <img className='card-img-top w-100'src={product.imageCover} alt={product.category.name} />
              </figure>
               </Link>

              <div className="body px-3">
     <h3 className='h6 mainColor'>{product.category.name}</h3>
    <h2 className='h6 text-center fw-light'>{product.title.split(' ').slice(0 , 3).join(' ')}</h2>

    <div className="d-flex justify-content-between px-1">
    { product.priceAfterDiscount? 

    
    <p> <span className='text-decoration-line-through'> {product.price} </span> - {product.priceAfterDiscount}</p> : <p>{product.price} </p> }
     



        <span>
           <i className='fa-solid fa-star text-warning cursor-pointer'></i>
      {product.ratingsQuantity}
        </span>



    </div>





              </div>
              <div className="items d-flex justify-content-between mb-4">
                        <button onClick={()=> addProduct(product.id)} className='disableButton mb-2  cursor-pointer'>Add to cart +</button>
                        <div className="icon">
                        <i id="heart" onClick={()=> addWishList(product.id)} className={`favoriteItem fa-solid fa-heart fs-2  cursor-pointer`}></i>
                        </div>
                       </div>

          </div>  
</Col>
      } 
      
      )}
   </Row>
</Container>
   </>
  )
}
