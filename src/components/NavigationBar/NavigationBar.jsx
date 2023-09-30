import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import{useSelector,useDispatch} from 'react-redux'
import { logout } from '../../redux/authSlice';
import { clearOrder } from '../../redux/orderSlice';
import {Link} from 'react-router-dom';
import './NavigationBar.css'

export default function NavigationBar() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth);
  const [value, setValue] = React.useState(0);
  const cartData = useSelector((state)=>state.cart.products);
  const totalItems = cartData.reduce((sum,item)=>{return sum+item.quantity},0)

  return (
    <div className="d-lg-none d-md-none">
      <Box sx={{position:'fixed',bottom:'0',right:'0',left:'0',zIndex:999 }} style={{boxShadow: '0 0 15px 2px lightgray'}} elevation={4}>
        <BottomNavigation
        showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction onClick={()=>{setValue(0)}} label="Search" icon={<SearchOutlinedIcon />} data-bs-toggle="modal" data-bs-target="#searchModal"/>
           <BottomNavigationAction onClick={()=>{setValue(0)}} label="Wishlist" icon={<FavoriteBorderOutlinedIcon />} component={Link} to="/customer/wishlist"/>
          <BottomNavigationAction onClick={()=>{setValue(0)}} label="Profile" icon=
              { user.isAuthenticate ? 
                    <span className="fw-600" style={{padding:'0.5px 6px 0.5px 6px',border:'2px solid #545252',borderRadius:'100%'}}>{user.user.user.name[0].toUpperCase()}</span>
                    :
                     <AccountCircleOutlinedIcon/>
              }
         data-bs-toggle="modal" data-bs-target="#profile-mobile-modal" />
          {/*  <Link to="/checkout" className="nav-link"><BottomNavigationAction onClick={()=>{setValue(0)}} label="Cart" icon={<ShoppingCartOutlinedIcon />} /></Link> */}
          {/* <span className="badge navigationbar-cart-badge">{totalItems}</span> */}
        </BottomNavigation>
      </Box>
      <div className="modal"  id="profile-mobile-modal">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header" style={{border:'0'}}>
               <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
             </div>
             {/* <!-- Modal body --> */}
             <div className="modal-body py-0">
             { user.isAuthenticate ?
                <>
               <h4 className="text-capitalize">Hey! hashim ali zaidi</h4>
                  <div className="">
                  <Link to="/customer/orders" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><LocalMallOutlinedIcon/> Orders</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link><Link to="/customer/wishlist" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><FavoriteBorderOutlinedIcon/> wishlist</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/customer/profile" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><PersonOutlineIcon/> update profile</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/customer/addressbook" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><PinDropOutlinedIcon/> saved addresses</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/contact-us" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><SupportAgentOutlinedIcon/> Help Center</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" onClick={()=>{dispatch(logout());dispatch(clearOrder())}} data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><LogoutOutlinedIcon/> logout</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><InfoOutlinedIcon/> about us</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/terms" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><GppMaybeOutlinedIcon/> terms of use</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/privacy" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><InventoryOutlinedIcon/> privacy policy</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                  </div>
              </>
                :
                <>
                  <h4 >Hey there!</h4>
                  <small className="text-secondary">Sign in or join to do a lot more with your Yas account</small>
                  <div data-bs-toggle="modal" >
                  <Link to="/customer/login" className="text-capitalize w-100 py-2 btn btn-pink border-0" >sign in</Link>
                  </div>
                  <div className="text-center text-secondary my-2" data-bs-toggle="modal" >
                    <small>New to yas? <Link to="/customer/register" className="text-secondary" >Join us</Link></small>
                  </div>
                  <div className="mt-">
                  <Link to="" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><LocalMallOutlinedIcon/> Orders</span>
                      <LockOutlinedIcon/>
                      </div>
                    </Link><Link to="" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><FavoriteBorderOutlinedIcon/> wishlist</span>
                      <LockOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><PersonOutlineIcon/> update profile</span>
                      <LockOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><PinDropOutlinedIcon/> saved addresses</span>
                      <LockOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark ">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><SupportAgentOutlinedIcon/> Help Center</span>
                      <LockOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2">
                      <span className="text-capitalize text-dark"><InfoOutlinedIcon/> about us</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/terms" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><GppMaybeOutlinedIcon/> terms of use</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                    <Link to="/privacy" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between mobile-profile-link py-2" data-bs-dismiss="modal">
                      <span className="text-capitalize text-dark"><InventoryOutlinedIcon/> privacy policy</span>
                      <ChevronRightOutlinedIcon/>
                      </div>
                    </Link>
                  </div>
                </>
                }
            </div>
           </div>
         </div>
      </div>
    </div>
  );
}