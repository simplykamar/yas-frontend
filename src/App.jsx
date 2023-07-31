import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import AllProducts from './Components/AllProducts/AllProducts';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import PageNotFound from './Components/PageNotFound/PageNotFound';

import Checkout from './Components/Checkout/Checkout';
import CheckoutStep1 from './Components/Checkout/CheckoutStep1';
import CheckoutStep2 from './Components/Checkout/CheckoutStep2';
import ConfirmOrder from './Components/Checkout/ConfirmOrder';

import Thank from './Components/Checkout/Thank';

import CustomerRegister from './Components/CustomerRegister/CustomerRegister';
import CustomerLogin from './Components/CustomerLogin/CustomerLogin';

import CustomerWishlist from './Components/CustomerWishlist/CustomerWishlist';
import Address from './Components/CustomerProfile/Address';
import Profile from './Components/CustomerProfile/Profile';
import Orders from './Components/CustomerProfile/Orders';
import TagProducts from './Components/TagProducts/TagProducts';
import CustomerAccountActivation from './Components/CustomerAccountActivation/CustomerAccountActivation';
import CustomerRegisterSuccess from './Components/CustomerRegister/CustomerRegisterSuccess';

import Register from './Components/seller/Register';
import Login from './Components/seller/Login';
import Dashboard from './Components/seller/Dashboard';
import Products from './Components/seller/Products';
import AddProduct from './Components/seller/AddProduct';
import SellerOrders from './Components/seller/Orders';
import Customers from './Components/seller/Customers';
import Reports from './Components/seller/Reports';
import Footer from './Components/Footer/Footer';

// import seller from './Components/seller/Register';

import Protected from './Protected';
import IsLogin from './IsLogin';
import { Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:category_slug/:category_id" element={<CategoryProducts/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail/>}/>
        <Route path="/customer/register" element={<IsLogin Component={CustomerRegister}/>}/>
        <Route path="/customer/register/success" element={<IsLogin Component={CustomerRegisterSuccess}/>}/>
        <Route path="/customer/login" element={<IsLogin Component={CustomerLogin}/>}/>
        
        <Route path="/customer/addressbook" element={ <Protected Component={Address} /> } />
        <Route path="/customer/orders" element={<Protected Component={Orders} /> }/>
        <Route path="/customer/profile" element={<Protected Component={Profile}/>}/>
        {/*  */}
        <Route path="/customer/wishlist" element={<Protected Component={CustomerWishlist}/>}/>
        <Route path="/products/:tag/" element={<TagProducts/>}/>
        <Route path="/confirm-order" element={<Protected Component={ConfirmOrder}/>}/>
        <Route path="/activate/:uid/:token" element={<CustomerAccountActivation/>}/>

        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<Protected Component={Thank}/>}/>
        <Route path="/checkout-step-1" element={<Protected Component={CheckoutStep1}/>}/>
        <Route path="/checkout-step-2" element={<Protected Component={CheckoutStep2}/>}/>
        <Route path="*" element={<PageNotFound/>}/>


{/* seller routes */}
        <Route path="/seller/register" element={<Register/>}/>
        <Route path="/seller/login" element={<Login/>}/>
        <Route path="/seller/dashboard" element={<Dashboard/>}/>
        <Route path="/seller/Products" element={<Products/>}/>
        <Route path="/seller/add-product" element={<AddProduct/>}/>
        <Route path="/seller/orders" element={<SellerOrders/>}/>
        <Route path="/seller/customers" element={<Customers/>}/>
        <Route path="/seller/reports" element={<Reports/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
