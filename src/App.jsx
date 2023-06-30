import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import HomeScreen from "./features/home/HomeScreen"
import Layout from "./components/layouts/Layout"
import ShopScreen from "./features/shop/ShopScreen"
import AboutScreen from "./features/about/AboutScreen"
import ContactScreen from "./features/contact/ContactScreen"
import LoginScreen from "./features/auth/LoginScreen"
import RegisterScreen from "./features/auth/RegisterScreen"

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
