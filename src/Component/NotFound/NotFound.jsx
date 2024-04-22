import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return ( <>

      <Helmet>
        <title>not found</title>
      </Helmet>

       <div className="justify-content-center align-items-center vh-100">
     <img className ='w-100' src={require('../../assets/finalProject assets/404.png')} alt="" />
   </div>
  </>
  )
}
