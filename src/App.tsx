
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductList from './pages/product_list'
import ProductDetails from './pages/productDetails'
import ShoppingBag from './pages/shoppingBag'
import WishList from './pages/wishlist'
import { ContactUs } from './pages/contactUs'

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs/:categoryKey/:categoryId" element={<ProductList />} />
        <Route path='/product-details/:categoryKey/:productId' element={<ProductDetails />} />
        <Route path='/bag' element={<ShoppingBag />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/contact-us' element={<ContactUs />} />
    </Routes>
  )
}

export default App