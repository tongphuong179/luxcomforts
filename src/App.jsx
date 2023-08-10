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
import LayoutAdmin from "./components/admin/LayoutAdmin"
import UserAdminScreen from "./features/admin/features/user/UserAdminScreen"
import ProductAdminScreen from "./features/admin/features/products/ProductAdminScreen"
import CategoryAdminScreen from "./features/admin/features/categories/CategoryAdminScreen"
import DiscountAdminScreen from "./features/admin/features/discount/DiscountAdminScreen"
import VoucherAdminScreen from "./features/admin/features/voucher/VoucherAdminScreen"
import OrderAdminScreen from "./features/admin/features/order/OrderAdminScreen"
import PaymentSuccess from "./features/payment/PaymentSuccess"
import OrderScreen from "./features/order/OrderScreen"
import OrderDetail from "./features/order/OrderDetail"
import OrderAdminDetail from "./features/admin/features/order/OrderAdminDetail"
import OrderUser from "./features/admin/features/order/OrderUser"

function App() {

  const isLoggedIn = useSelector(state => state.auth.isLogin)
  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/product/:productId" element={<ProductDetailScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/payment/" element={<PaymentSuccess />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/cart" element={<Protected isLoggedIn={isLoggedIn}><CartScreen /></Protected>} />
          <Route path="/order" element={<Protected isLoggedIn={isLoggedIn}><OrderScreen /></Protected>} />
          <Route path="/orderDetail/:orderId" element={<Protected isLoggedIn={isLoggedIn}><OrderDetail /></Protected>} />

        </Route>

        {/* Add curly braces to enclose LayoutAdmin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="user" element={<UserAdminScreen />} />
          <Route path="product" element={<ProductAdminScreen />} />
          <Route path="category" element={<CategoryAdminScreen />} />
          <Route path="discount" element={<DiscountAdminScreen />} />
          <Route path="voucher" element={<VoucherAdminScreen />} />
          <Route path="order" element={<OrderAdminScreen />} />
          <Route path="orderDetail/:orderId" element={<Protected isLoggedIn={isLoggedIn}><OrderAdminDetail /></Protected>} />
          <Route path="orderUser/:userId" element={<Protected isLoggedIn={isLoggedIn}><OrderUser /></Protected>} />
        </Route>
      </Routes>
    </QueryClientProvider>

  )
}

export default App
