import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Product from './Component/Product/Product';
import NotFound from './Component/NotFound/NotFound';
import Layout from './Component/Layout/Layout';
import AuthContextProvider from './Context/AuthContext';
import Cart from './Component/Cart/Cart';
import Categories from './Component/Categories/Categories';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CartContextPro from './Context/CartContextPro';
import { Toaster } from 'react-hot-toast';
import Payment from './Component/Payment/Payment';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import ResetAccount from './Component/ResetAccount/ResetAccount';
import Brands from './Component/Brands/Brands';
import WishList from './Component/WishList/WishList';
import AllOrders from './Component/AllOrders/AllOrders';
import Home from './Component/Home/Home';
import WishListContext from './Context/WishListContext';

// import Profile from './Component/Profile/Profile';

const myRouter=createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:'true',element:<Register/>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'resetPassword',element:<ResetPassword/>},
    {path:'resetAccount',element:<ResetAccount/>},
    {path:'cart',element:
    <ProtectedRoute>
     <Cart/>
    </ProtectedRoute>
    },
    {path:'home',element:
    <ProtectedRoute>
      <Home/>
    </ProtectedRoute>
    
  },
    {path:'categories',element:
    <ProtectedRoute>
      <Categories/>
    </ProtectedRoute>
    
  },
  {path:'brands',element:
  <ProtectedRoute>
    <Brands/>
  </ProtectedRoute>
  
},
{path:'wishlist',element:
<ProtectedRoute>
  <WishList/>
</ProtectedRoute>

},
 
    {path:'logout',element:<Login/>},

    {path:'product',element:
    <ProtectedRoute>
      <Product/>
    </ProtectedRoute>
  
  },

  {path:'payment',element:
  <ProtectedRoute>
    <Payment/>
  </ProtectedRoute>

}
,
{path:'allorders',element:
<ProtectedRoute>
  <AllOrders/>
</ProtectedRoute>

},

  {path:'productDetails/:id',element:
  <ProtectedRoute>
    <ProductDetails/>
  </ProtectedRoute>

},
  ]},//router
  {path:'*',element:<NotFound/>},

])
// QueryClientProvider => component

export default function App() {
// react-helmet
  const myClient=new QueryClient();

  return <>
  <QueryClientProvider client={myClient}>
     <AuthContextProvider>
      <CartContextPro>
         <WishListContext>
         <RouterProvider router={myRouter}/>
         </WishListContext>
      </CartContextPro>
    </AuthContextProvider>
  </QueryClientProvider>
   <Toaster/>
  </>
}

