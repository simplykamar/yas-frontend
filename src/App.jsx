import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import CategoryProducts from './components/CategoryProducts/CategoryProducts';
import AllProducts from './components/AllProducts/AllProducts';
import ProductDetail from './components/ProductDetail/ProductDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Checkout from './components/Checkout/Checkout';
import CheckoutStep1 from './components/Checkout/CheckoutStep1';
import CheckoutStep2 from './components/Checkout/CheckoutStep2';
import ConfirmOrder from './components/Checkout/ConfirmOrder';
import Thank from './components/Checkout/Thank';
import CustomerRegister from './components/CustomerRegister/CustomerRegister';
import CustomerLogin from './components/CustomerLogin/CustomerLogin';
import ForgotPassword from './components/CustomerLogin/ForgotPassword';
import GetResetPaswordLink from './components/CustomerLogin/GetResetPaswordLink';
import CustomerWishlist from './components/CustomerWishlist/CustomerWishlist';
import Address from './components/CustomerProfile/Address';
import Profile from './components/CustomerProfile/Profile';
import Orders from './components/CustomerProfile/Orders';
import TagProducts from './components/TagProducts/TagProducts';
import CustomerAccountActivation from './components/CustomerAccountActivation/CustomerAccountActivation';
import CustomerRegisterSuccess from './components/CustomerRegister/CustomerRegisterSuccess';
import Contact from './components/PrivacyPolicy/contact/Contact';
import Terms from './components/PrivacyPolicy/terms/Terms';
import Privacy from './components/PrivacyPolicy/privacy/Privacy';
import Footer from './components/Footer/Footer';

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
        <Route path="/reset-password" element={<IsLogin Component={GetResetPaswordLink}/>}/>
        <Route path="/set-new-password/:uid/:token" element={<IsLogin Component={ForgotPassword}/>}/>
        <Route path="/contact-us" element={ <Protected Component={Contact} /> } />
        <Route path="/terms" element={ <Terms/> } />
        <Route path="/privacy" element={ <Privacy/> } />
        <Route path="/customer/addressbook" element={ <Protected Component={Address} /> } />
        <Route path="/customer/orders" element={<Protected Component={Orders} /> }/>
        <Route path="/customer/profile" element={<Protected Component={Profile}/>}/>
        <Route path="/customer/wishlist" element={<Protected Component={CustomerWishlist}/>}/>
        <Route path="/products/:tag/" element={<TagProducts/>}/>
        <Route path="/confirm-order" element={<Protected Component={ConfirmOrder}/>}/>
        <Route path="/activate/:uid/:token" element={<IsLogin Component={CustomerAccountActivation}/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<Protected Component={Thank}/>}/>
        <Route path="/checkout-step-1" element={<Protected Component={CheckoutStep1}/>}/>
        <Route path="/checkout-step-2" element={<Protected Component={CheckoutStep2}/>}/>
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
