
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductList from './pages/product_list'
import ProductDetails from './pages/productDetails'
import ShoppingBag from './pages/shoppingBag'
import WishList from './pages/wishlist'
<<<<<<< HEAD
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
=======
import { ContactUs } from './pages/contactUs'
import AccountPage from './pages/account'
import Address from './pages/account/Address'
import Orders from './pages/account/Orders'
import Profile from './pages/account/Profile'
>>>>>>> develop

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs/:categoryKey/:categoryId" element={<ProductList />} />
        <Route path='/product-details/:categoryKey/:productId' element={<ProductDetails />} />
        <Route path='/bag' element={<ShoppingBag />} />
        <Route path='/wishlist' element={<WishList />} />
<<<<<<< HEAD
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
=======
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path="/account" element={<AccountPage />}>
            <Route path="address" element={<Address />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
        </Route>
>>>>>>> develop
    </Routes>
  )
}

export default App