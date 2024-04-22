import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { ThreeDots } from 'react-loader-spinner'

export default function Profile() {
  // const{userData} = useContext(authContext)


  // if(!userData){
  //   return<>   
  //   <div className="d-flex vh-100 bg-secondary bg-opacity-50 justify-content-center align-items-center">
  //     <ThreeDots
  //       visible={true}
  //       height="80"
  //       width="80"
  //       color="#fff"
  //       radius="9"
  //       ariaLabel="three-dots-loading"
  //       wrapperStyle={{}}
  //       wrapperClass=""
  //        />
  //    </div>
  //    </>
  // }
  // return (
  //  <>
  //  <div className="container mt-4">
  //     <h1>Hello ya {userData?.name}</h1>
  //  </div>
  //  </>
  // )
}
