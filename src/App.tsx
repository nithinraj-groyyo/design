import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ProductList from './pages/product_list';
import ProductDetails from './pages/productDetails';
import ShoppingBag from './pages/shoppingBag';
import WishList from './pages/wishlist';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { ContactUs } from './pages/contactUs';
import AccountPage from './pages/account';
import Address from './pages/account/Address';
import Orders from './pages/account/Orders';
import Profile from './pages/account/Profile';
import ChangePassword from './pages/account/ChangePassword';
import NotFoundPage from './pages/NotFoundPage';
import AdminProductList from './pages/account/product/AdminProductList';
import BulkUploadProduct from './pages/account/product/BulkUploadProduct';
import AddProducts from './pages/account/product/AddProducts';
import ProtectedRoute from './layouts/ProtectedRoutes';
import OrderReturns from './pages/account/product/OrderReturns';
import AdminRoutes from './layouts/AdminRoutes';
import Unauthorized from './components/Unauthorized';
import EditProduct from './pages/account/product/EditProduct';
import ServicePage from './pages/service_page/ServicePage';
import AboutPage from './pages/aboutPage/AboutPage';

const App = () => {
  const userId = JSON.parse(localStorage.getItem('userId') as string);
  const isAuthenticated = Boolean(userId); 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/">
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route path="/designs/:categoryKey/:categoryId" element={<ProductList />} />
      <Route path="/product-details/:categoryKey/:productId" element={<ProductDetails />} />
      <Route path="/bag" element={<ShoppingBag />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/services" element={<ServicePage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="account" element={<AccountPage />}>
        <Route path="address" element={<Address />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="changePassword" element={<ChangePassword />} />
        
        <Route path="product-list" element={<AdminRoutes />}>
          <Route path="" element={<AdminProductList />} />
        </Route>
        <Route path="bulk-upload" element={<AdminRoutes />}>
            <Route path="" element={<BulkUploadProduct />} />
        </Route>

        <Route path="add-product" element={<AdminRoutes />}>
            <Route path="" element={<AddProducts />} />
        </Route>

        <Route path="edit-product" element={<AdminRoutes />}>
            <Route path="" element={<EditProduct />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        
        <Route path="orders-returns" element={<OrderReturns />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;