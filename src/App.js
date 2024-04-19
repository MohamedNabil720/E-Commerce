import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import AuthLayout from './Layout/AuthLayout'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/cartContext'
import { ToastContainer } from 'react-toastify';
import Wishlist from './Components/Wishlist/Wishlist'
import AddressPage from './Components/AddressPage/AddressPage'
import Orders from './Components/Orders/Orders'

export default function App() {


  const routs = createHashRouter([
    {
      path: "/", element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        { path: 'home', element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes> <Products /> </ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes> <Categories /> </ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
        { path: 'product-details/:id', element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },
        { path: 'address', element: <ProtectedRoutes> <AddressPage /> </ProtectedRoutes> },
        { path: 'whishlist', element: <ProtectedRoutes> <Wishlist /> </ProtectedRoutes> },
        { path: 'allorders', element: <ProtectedRoutes> <Orders /> </ProtectedRoutes> },
        { path: '*', element: <Notfound /> },

      ]
    },

    {
      path: "/", element: <AuthLayout />, children: [

        { path: 'signup', element: <SignUp /> },
        { path: 'signin', element: <SignIn /> },


      ]
    }
  ])

  return (

    <>

      <CartContextProvider>

        <RouterProvider router={routs}></RouterProvider>

      </CartContextProvider>

      <ToastContainer theme='colored' autoClose={1200} />
    </>
  )
}
