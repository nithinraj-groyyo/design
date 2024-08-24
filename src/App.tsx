
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductList from './pages/product_list'
import ProductDetails from './pages/productDetails'
import ShoppingBag from './pages/shoppingBag'
import WishList from './pages/wishlist'

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs/:categoryKey/:categoryId" element={<ProductList />} />
        <Route path='/product-details/:categoryKey/:productId' element={<ProductDetails />} />
        <Route path='/bag' element={<ShoppingBag />} />
        <Route path='/wishlist' element={<WishList />} />
    </Routes>
  )
}

export default App