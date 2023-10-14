import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import React, { lazy, Suspense } from 'react';
import Footer from './components/Footer/Footer';
import Main from './components/Loading/Main';
import { Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
const Home = lazy(()=>import("./components/Home/Home"));
const Categories = lazy(()=>import("./components/Categories/Categories"));
const CategoryProducts = lazy(()=>import("./components/CategoryProducts/CategoryProducts"));
const AllProducts = lazy(()=>import("./components/AllProducts/AllProducts"));
const ProductDetail = lazy(()=>import("./components/ProductDetail/ProductDetail"));
const PageNotFound = lazy(()=>import("./components/PageNotFound/PageNotFound"));
const Checkout = lazy(()=>import("./components/Checkout/Checkout"));
const CheckoutStep1 = lazy(()=>import("./components/Checkout/CheckoutStep1"));
const CheckoutStep2 = lazy(()=>import("./components/Checkout/CheckoutStep2"));
const ConfirmOrder = lazy(()=>import("./components/Checkout/ConfirmOrder"));
const Thank = lazy(()=>import("./components/Checkout/Thank"));
const CustomerRegister = lazy(()=>import("./components/CustomerRegister/CustomerRegister"));
const CustomerLogin = lazy(()=>import("./components/CustomerLogin/CustomerLogin"));
const ForgotPassword = lazy(()=>import("./components/CustomerLogin/ForgotPassword"));
const GetResetPaswordLink = lazy(()=>import("./components/CustomerLogin/GetResetPaswordLink"));
const CustomerWishlist = lazy(()=>import("./components/CustomerWishlist/CustomerWishlist"));
const Address = lazy(()=>import("./components/CustomerProfile/Address"));
const Profile = lazy(()=>import("./components/CustomerProfile/Profile"));
const Orders = lazy(()=>import("./components/CustomerProfile/Orders"));
const SearchProducts = lazy(()=>import("./components/SearchProducts/SearchProducts"));
const CustomerAccountActivation = lazy(()=>import("./components/CustomerAccountActivation/CustomerAccountActivation"));
const CustomerRegisterSuccess = lazy(()=>import("./components/CustomerRegister/CustomerRegisterSuccess"));
const Contact = lazy(()=>import("./components/PrivacyPolicy/contact/Contact"));
const Terms = lazy(()=>import("./components/PrivacyPolicy/terms/Terms"));
const Privacy = lazy(()=>import("./components/PrivacyPolicy/privacy/Privacy"));
const Protected = lazy(()=>import("./Protected"));
const IsLogin = lazy(()=>import("./IsLogin"));


function App() {

  return (
    <div className="App">
    <Navbar/>
    <Suspense fallback={<Main loading={true}/>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:category_slug/:category_id" element={<CategoryProducts/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail/>}/>
        <Route path="/customer/register" element={<IsLogin Component={CustomerRegister}/>}/>
        <Route path="/customer/register/success" element={<IsLogin Component={CustomerRegisterSuccess}/>}/>
        <Route path="/customer/login" element={<IsLogin Component={CustomerLogin}/>}/>
        <Route path="/reset-password" element={<IsLogin Component={GetResetPaswordLink}/>}/>
        <Route path="/set-new-password/:uid/:token" element={<IsLogin Component={ForgotPassword}/>}/>
        <Route path="/contact-us" element={ <Protected Component={Contact} /> } />
        <Route path="/terms" element={ <Terms/> } />
        <Route path="/privacy" element={ <Privacy/> } />
        <Route path="/customer/addressbook" element={ <Protected Component={Address} /> } />
        <Route path="/customer/orders" element={<Protected Component={Orders} /> }/>
        <Route path="/customer/profile" element={<Protected Component={Profile}/>}/>
        <Route path="/customer/wishlist" element={<Protected Component={CustomerWishlist}/>}/>
        <Route path="/products/:query/" element={<SearchProducts/>}/>
        <Route path="/confirm-order" element={<Protected Component={ConfirmOrder}/>}/>
        <Route path="/activate/:uid/:token" element={<IsLogin Component={CustomerAccountActivation}/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<Protected Component={Thank}/>}/>
        <Route path="/checkout-step-1" element={<Protected Component={CheckoutStep1}/>}/>
        <Route path="/checkout-step-2" element={<Protected Component={CheckoutStep2}/>}/>
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App
