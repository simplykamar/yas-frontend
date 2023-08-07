import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../redux/authSlice';
import { clearOrder } from '../../redux/orderSlice';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import WifiCalling3TwoToneIcon from '@mui/icons-material/WifiCalling3TwoTone';
import PrivacyTipTwoToneIcon from '@mui/icons-material/PrivacyTipTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import axios from 'axios';
import {useState,useEffect} from 'react';
import img from '../../demo.png'

import Sidebar from './Sidebar'
import './Navbar.css';
import TextField from '@mui/material/TextField';

const Navbar = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const cartData = useSelector((state)=>state.cart.products);
  const sum=0;
  const totalItems = cartData.reduce((sum,item)=>{return sum+item.quantity},0)
  const user = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [searchProducts,setSearchProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [categoryDataLoading, setCategoryDataLoading] = useState(true)
  const [productDataLoading, setProductDataLoading] = useState(true)
  const [isSearchResult, setIsSearchResult] = useState(false)

  const openModal= ()=> { setIsOpen( true )}
  const closeModal= ()=> { setIsOpen( false )}

function fetchCategoriesData(url){
    axios.get(url)
    .then((response)=>{
      setCategories(response.data)
      setCategoryDataLoading(false);
    })
    .catch((error)=>{console.log(error)})
}
function fetchProductsData(url){
    axios.get(url)
    .then((response)=>{
      setSearchProducts(response.data)
      setProductDataLoading(false);
      if(response.data.length){
        setIsSearchResult(true)
      }
    })
    .catch((error)=>{console.log(error)})
}
  function fetchSearchData(q){
    if(q.length){
      console.log(q);
      fetchCategoriesData(BASE_URL+`/categories/?q=${q}`);
      fetchProductsData(BASE_URL+`/products/?q=${q}`);
    }else{
      setSearchProducts([]);
      setCategories([]);
        setIsSearchResult(false);
    }
  }
	return(
    <>
		<div className="sticky-top">
			<nav className="navbar navbar-expand navbar-light bg-light">
  <div className="container">
  <Sidebar/>
    <Link className="navbar-brand ms-3" to="/">yas</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
          <li className="nav-item ">
          <span className="text-secondary cursor-pointer" data-bs-toggle="modal" data-bs-target="#searchModal">
          <span className="d-none d-md-block d-lg-inline-block">Search for gifts</span>
            <SearchOutlinedIcon className="ms-lg-2 ms-md-2" style={{fontSize:'30px'}}/>
          </span>
          </li>
      </ul>

      <ul className="navbar-nav ms-auto me-4 me-lg-0 me-md-0">
        {/* <li className="nav-item"> */}
        {/*   <Link to="/categories" className="nav-link">Categories</Link> */}
        {/* </li> */}
       
      <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinks" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { user.isAuthenticate ? 
                    <span className="fw-600" style={{padding:'1px 6px 1px 6px',border:'2px solid black',borderRadius:'100%'}}>{user.user.user.name[0].toUpperCase()}</span>
                    :
                     <AccountCircleOutlinedIcon/>
              }
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinks">
              { user.isAuthenticate ? 
                  <>
                    {/* <li><Link to="/customer/dashboard" className="dropdown-item">Dashboard</Link></li> */}
                     <li><Link to='/customer/profile' className="dropdown-item"><PersonOutlineTwoToneIcon fontSize='small'/> Profile</Link></li>
                     <li><Link to='' className="dropdown-item"><LocalShippingTwoToneIcon fontSize='small'/> Track Order</Link></li>
                     <li><Link to='/customer/orders' className="dropdown-item"><LocalMallTwoToneIcon fontSize='small'/> Order History</Link></li>
                     <li><Link to='/customer/addressbook' className="dropdown-item"><ListAltTwoToneIcon fontSize='small'/> Address Book</Link></li>
                     <li><Link to='' className="dropdown-item"><WifiCalling3TwoToneIcon fontSize='small'/> Contact Us</Link></li>
                     <li><Link to='' className="dropdown-item"><PrivacyTipTwoToneIcon fontSize='small'/> Privacy Policy</Link></li>
                     <li><Link to='' className="dropdown-item" onClick={()=>{dispatch(logout());dispatch(clearOrder())}}><PowerSettingsNewTwoToneIcon fontSize='small'/> Logout</Link></li>
                  </>
                  :
                  <>
                    <li><Link to="/customer/register" className="dropdown-item">Register</Link></li>
                    <li><Link to="/customer/login" className="dropdown-item">Login</Link></li>
                  </>
              }
            </ul>
      </li>
         <li className="nav-item">
          <Link to="/customer/wishlist" className="nav-link"><FavoriteBorderOutlinedIcon/></Link>
        </li>
        <li className="nav-item">
          <Link to="/checkout" className="nav-link"><ShoppingBagOutlinedIcon/><span className="badge navbar-cart-badge">{totalItems}</span></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>

        <div className="modal" id="searchModal">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">

                 <div className="modal-header">
                   <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                 </div>

                 <div className="modal-body pt-0 pb-5">
                 <form>
                    <div className="mt-4">
                      <TextField InputProps={{ sx: { borderRadius: 10 } }} id="outlined-search" onChange={(e)=>{fetchSearchData(e.target.value)}} name="search" fullWidth label="Search for gifts" type="search" />
                      {/* <input type="search" name="search" onChange={(e)=>{fetchSearchData(e.target.value)}} className="form-control rounded-5" placeholder="Search for gifts"  id="floatingSearchInputPwdGrid" /> */}
                      {/* <SearchOutlinedIcon style={{position:'absolute',right:'5',bottom:'15',zIndex:"999"}}/> */}
                      {/* <label htmlFor="floatingSearchInputPwdGrid">Search for gifts</label> */}
                  </div>
                </form>
                {
                  isSearchResult &&
                      <div className="m-3">
                        <p className="text-secondary text-uppercase fw-600">collections</p>
                        <div className="fw-600" data-bs-dismiss="modal">
                        { !categoryDataLoading
                            ?
                              categories.map((item)=>{return(
                                <p className="line-height-8" key={item.id}><Link to={`/category/${item.title}/${item.id}`} className="text-dark text-capitalize text-decoration-none">{item.title}</Link></p>

                              )})
                            :"loading..."
                        }
                        
                        </div>

                        <p className="text-secondary text-uppercase fw-600">products</p>
                           { !productDataLoading
                            ?
                              searchProducts.map((item)=>{return(
                                <Link to={`/product/${item.title}/${item.id}`} key={item.id} className="text-dark text-capitalize text-decoration-none">
                                <div className="d-flex list-group-item mb-2" data-bs-dismiss="modal">
                                <img src={item.product_imgs[0].image} className="img-fluid" width='50'/>
                                  <p className="line-height-8 mt-2 ms-2">{item.title.slice(0,60)}...</p>
                                </div>
                                </Link>
                              )})
                            :"loading..."
                        }
                      </div>
                }
              

                 </div>
               </div>
            </div>
		</div>
    </>

		)
}
export default Navbar; 