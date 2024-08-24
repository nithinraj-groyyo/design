
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductList from './pages/product_list'

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs/:categoryKey/:categoryId" element={<ProductList />} />
    </Routes>
  )
}

export default App