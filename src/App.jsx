import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import HomeScreen from "./features/home/HomeScreen"
import Layout from "./components/layouts/Layout"
import ShopScreen from "./features/shop/ShopScreen"
import AboutScreen from "./features/about/AboutScreen"
import ContactScreen from "./features/contact/ContactScreen"
import LoginScreen from "./features/auth/LoginScreen"
import RegisterScreen from "./features/auth/RegisterScreen"
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'
import CartScreen from "./features/cart/CartScreen"
import ProductDetailScreen from "./features/product-detail/ProductDetailScreen"
import { useState } from "react"
import Protected from "./features/auth/Protected"
import { useSelector } from "react-redux"

function App() {

  const isLoggedIn = useSelector(state => state.auth.isLogin)
  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/product/:productId" element={<ProductDetailScreen />} />
          <Route path="/about" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/cart'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <CartScreen />
              </Protected>
            } />

        </Route>
      </Routes>
    </QueryClientProvider>

  )
}

export default App
