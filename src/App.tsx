import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductList from "./pages/product_list";
import ProductDetails from "./pages/productDetails";
import ShoppingBag from "./pages/shoppingBag";
import WishList from "./pages/wishlist";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { ContactUs } from "./pages/contactUs";
import AccountPage from "./pages/account";
import Address from "./pages/account/profile/Address";
import Orders from "./pages/account/Orders";
import Profile from "./pages/account/profile/Profile";
import ChangePassword from "./pages/account/profile/ChangePassword";
import NotFoundPage from "./pages/NotFoundPage";
import AdminProductList from "./pages/account/product/AdminProductList";
import BulkUploadProduct from "./pages/account/product/BulkUploadProduct";
import AddProducts from "./pages/account/product/AddProducts";
import ProtectedRoute from "./layouts/ProtectedRoutes";
import OrderReturns from "./pages/account/product/OrderReturns";
import AdminRoutes from "./layouts/AdminRoutes";
import Unauthorized from "./components/Unauthorized";
import EditProduct from "./pages/account/product/EditProduct";
import ServicePage from "./pages/service_page/ServicePage";
import AboutPage from "./pages/aboutPage/AboutPage";
import TeamsPage from "./pages/teamPage/TeamsPage";
import AboutUsInfo from "./pages/account/websiteInformation/about/AboutUsInfo";
import AdminTeamPage from "./pages/account/websiteInformation/teams/AdminTeamPage";
import AdminServicePage from "./pages/account/websiteInformation/services/AdminServicePage";
import AdminFAQPage from "./pages/account/websiteInformation/faq/AdminFAQPage";
import ForgotPassword from "./pages/forgotPassword";
import useAuth from "./hooks/useAuth";

const App = () => {
  const isAuthenticated = useAuth();

  return (
    <Routes>
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
          // <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/">
          <Signup />
          // </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/designs/:categoryId" element={<ProductList />} />
      <Route path="/product-details/:categoryKey/:productId" element={<ProductDetails />} />
      <Route path="/bag" element={<ShoppingBag />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/contact-us" element={<ContactUs />} />

      <Route path="/services" element={<ServicePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamsPage />} />

      <Route path="account" element={<AccountPage />}>
        <Route path="address" element={<Address />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="changePassword" element={<ChangePassword />} />

        <Route path="web-info" element={<AdminRoutes />}>
          <Route path="about-us" element={<AboutUsInfo />} />
          <Route path="teams" element={<AdminTeamPage />} />
          <Route path="services" element={<AdminServicePage />} />
          <Route path="faq" element={<AdminFAQPage />} />
        </Route>

        <Route path="product-list" element={<AdminRoutes />}>
          <Route path="" element={<AdminProductList />} />
        </Route>
        <Route path="bulk-upload" element={<AdminRoutes />}>
          <Route path="" element={<BulkUploadProduct />} />
        </Route>

        <Route path="add-product" element={<AdminRoutes />}>
          <Route path="" element={<AddProducts />} />
        </Route>

        <Route path="edit-product/:productId" element={<AdminRoutes />}>
          <Route path="" element={<EditProduct />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="orders-returns" element={<OrderReturns />} />
      </Route>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
