import Sidebar from './Sidebar'
import './Navbar.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../redux/authSlice';
import { clearOrder } from '../../redux/orderSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import yaslogo from '../../images/logos/yaslogo.png'
import axios from 'axios';

const Navbar = () => {
  // const BASE_URL = 'https://simplykamar.tech/api';
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const cartData = useSelector((state)=>state.cart.products);
  const navigate = useNavigate();
  const sum=0;
  const totalItems = cartData.reduce((sum,item)=>{return sum+item.quantity},0)
  const user = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [searchProducts,setSearchProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [categoryDataLoading, setCategoryDataLoading] = useState(true)
  const [productDataLoading, setProductDataLoading] = useState(true)
  const [isSearchResult, setIsSearchResult] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientSearchedData, setClientSearchedData] = useState(null)
  const [quickSearch,setQuickSearch] = useState([]);


  const openModal= ()=> { setIsOpen( true )}
  const closeModal= ()=> { setIsOpen( false )}

function fetchCategoriesData(url){
    axios.get(url)
    .then((response)=>{
      console.log(response)
      setCategories(response.data)
      setCategoryDataLoading(false);
    })
    .catch((error)=>{
    console.log(error)
      alert('Server error..!')
  })
}
function fetchProductsData(url){
    axios.get(url)
    .then((response)=>{
      console.log(response)
      setSearchProducts(response.data)
      setProductDataLoading(false);
    })
    .catch((error)=>{
    console.log(error)
      alert('Server error..!')
  })
}
  function fetchSearchData(q){
    setSearchQuery(q);
    if(q.length > 2 ){
      document.title = q;
      fetchCategoriesData(BASE_URL+`/categories/?q=${q}`);
      fetchProductsData(BASE_URL+`/products/?q=${q}`);
      setIsSearchResult(true)
      
    }else{
      document.title = "yas: Online Gifts Shopping";
      setSearchProducts([]);
      setCategories([]);
      setIsSearchResult(false);
    }
  }
  async function getClientData(e){
    e.preventDefault()
    if(clientSearchedData){
        setSearchedHistory(searchQuery,clientSearchedData)
      
    }else{
        await axios.get('https://ipapi.co/json/')
          .then(response=>{
            console.log(response)
            setClientSearchedData(response.data)
            setSearchedHistory(searchQuery,response.data)
          })
          .catch(error => {
            console.log(error)
        })
      }
  }

  function setSearchedHistory(q,clientSearchedData){
      const formData = new FormData()
      formData.append('query',q)
      formData.append('state',clientSearchedData.region)
      formData.append('city',clientSearchedData.city)
      formData.append('ip_address',clientSearchedData.ip)
      formData.append('latitude',clientSearchedData.latitude)
      formData.append('longitude',clientSearchedData.longitude)
      formData.append('operator',clientSearchedData.org)
      axios.post(BASE_URL+'/set-searched-history/',formData)
      .then(response=>{
        console.log(response)
        document.getElementById('btn-close').click();
        navigate(`/products/${q}`,{replace:true});
      })
  }
  function setQuickSearchData(){
    axios.get(BASE_URL+'/quick-search')
    .then(response=>{
      console.log(response)
      setQuickSearch(response.data)
    })
    .catch(error=>{
      alert('Server error..!')
      console.log(error)
    })
  }
  useEffect(()=>{
    setQuickSearchData();
  },[])
  return(
    <>
    <div className="sticky-top">
      <nav className="navbar navbar-expand navbar-light bg-light ">
  <div className="container">
  <Sidebar/>
    <Link className="navbar-brand ms-3" to="/"><img src={yaslogo} className="img-fluid" style={{width:'50px',height:'30px'}}/></Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
          <li className="nav-item d-none d-md-block d-lg-block">
            <span className="text-secondary cursor-pointer" data-bs-toggle="modal" data-bs-target="#searchModal">
            <span className="border py-2 px-5 rounded-5 bg-light"><SearchOutlinedIcon/> <span className="d-none d-md-inline-block d-lg-inline-block">Search for gifts</span></span>
          </span>
          </li>
      </ul>
      {/* show cart on mobile view */}
      <ul className="d-lg-none d-md-none navbar-nav ms-auto me-3">
        <li className="nav-item">
          <Link to="/checkout" className="nav-link"><ShoppingCartOutlinedIcon/><span className="badge navbar-cart-badge">{totalItems}</span></Link>
        </li>
        </ul>
        {/* Hide navbar items on mobile view */}
      <div className="d-none d-md-inline-block d-lg-inline-block ms-auto">
      <ul className="navbar-nav">
       <li className="nav-item">
          <Link to="/customer/wishlist" className="nav-link"><FavoriteBorderOutlinedIcon/></Link>
        </li>
        <li className="nav-item">
          <Link to="/checkout" className="nav-link"><ShoppingCartOutlinedIcon/><span className="badge navbar-cart-badge">{totalItems}</span></Link>
        </li>
      <li className="nav-item dropdown ms-4">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinks" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { user.isAuthenticate ? 
                    <span className="fw-600" style={{padding:'1px 6px 1px 6px',border:'2px solid #545252',borderRadius:'100%'}}>{user.user.user.name[0].toUpperCase()}</span>
                    :
                     <AccountCircleOutlinedIcon/>
              }
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinks">
              { user.isAuthenticate ? 
                  <>
                     <li><Link to='/customer/profile' className="dropdown-item"><PersonOutlineIcon fontSize='small'/> Profile</Link></li>
                     <li><Link to='/customer/orders' className="dropdown-item"><LocalMallOutlinedIcon fontSize='small'/> Order History</Link></li>
                     <li><Link to='/customer/addressbook' className="dropdown-item"><PinDropOutlinedIcon fontSize='small'/> Address Book</Link></li>
                     <li><Link to='/contact-us' className="dropdown-item"><SupportAgentOutlinedIcon fontSize='small'/> Contact Us</Link></li>
                     <li><Link to='/privacy' className="dropdown-item"><GppMaybeOutlinedIcon fontSize='small'/> Privacy</Link></li>
                     <li><Link to='/terms' className="dropdown-item"><InventoryOutlinedIcon fontSize='small'/> Terms</Link></li>
                     <li><Link to='' className="dropdown-item" onClick={()=>{dispatch(logout());dispatch(clearOrder())}}><LogoutOutlinedIcon fontSize='small'/> Logout</Link></li>
                  </>
                  :
                  <>
                    <li><Link to="/customer/register" className="dropdown-item">Register</Link></li>
                    <li><Link to="/customer/login" className="dropdown-item">Login</Link></li>
                  </>
              }
            </ul>
      </li>
      </ul>
      </div>
    </div>
  </div>
</nav>
  </div>
        <div className="modal" id="searchModal">
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
              <div className="modal-content">
                 <div className="modal-header" style={{border:'none'}}>
                   <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal"></button>
                 </div>
                 <div className="modal-body pt-0 pb-5">
                   <h4 className="" style={{marginLeft:'13px'}}>Find your gifts here...</h4>
                 <form onSubmit={(e)=>{getClientData(e)}}>
                    <div className="mt-3 ">
                      <TextField  
                      color='warning'
                      InputProps={{ 
                        sx: { borderRadius: 10,backgroundColor:'#f8f9fa ' },
                        startAdornment: (<InputAdornment position="end">
                                          <SearchOutlinedIcon style={{color:'#fc7e93'}}/>
                                          </InputAdornment>
                                        )
                                   }}
                      id="outlined-search"
                      onChange={(e)=>{fetchSearchData(e.target.value)}} 
                      name="search" fullWidth  
                      type="search"
                      value={searchQuery}
                       />
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
                            :<div className="text-center mt-2">
                               <div className="spinner-border text-danger"></div>
                               <div className="text-small">loading...</div>
                             </div>
                        }
                      </div>
                }
                <div className=" ">
                  <p className="my-3 text-secondary">Quick search...</p>
                  <div className="row gy-4">
                    {quickSearch.map((item)=>{
                      return(
                            <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={item.id}>
                              <div className="">
                                <div className="quick-search text-center py-2" onClick={(e)=>{fetchSearchData(item.query)}}>
                                {item.query}
                                </div>
                              </div>
                            </div>    
                        )
                    })
                    }
                  </div>
                </div>

                 </div>
               </div>
            </div>
    </div>
    </>
    )
}
export default Navbar; 