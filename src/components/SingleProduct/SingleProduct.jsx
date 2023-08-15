import { Link,useNavigate } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useState,useEffect} from 'react';
import './SingleProduct.css';
import {useSelector} from 'react-redux';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import toast, { Toaster } from 'react-hot-toast';
import ProgressiveImage from "react-progressive-graceful-image";
import yas from '../../images/other/yas.png'

const SingleProduct = (props) => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const user = useSelector((state)=>state.auth);
  const [userWishlist,setUserWishlist] = useState({is_wishlist:false,id:null})
  const [loading,setLoading] = useState(true)
  const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
  const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});

  const navigate = useNavigate()
  
  function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}
   function removeFromWishlist(id){
          if(user.isAuthenticate){
            axios.delete(BASE_URL+`/customer-wishlist/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
            notifySuccess('Remove from wishlist.');
            checkUserWishlist();
           })
            .catch(error=>{
            notifyError('Error try again!');
         })
          }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
   function addToWishlist(id){
          if(user.isAuthenticate){
          const formData = new FormData();
          formData.append('product',id);
          formData.append('customer',user.user.id);
           axios.post(BASE_URL+`/customer-wishlist/`,formData,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
            notifySuccess('Added to wishlist.');
            checkUserWishlist();
           })
          .catch(error=>{
            notifyError('Error try again!');
         })           }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
   function checkUserWishlist(){
          if(user.isAuthenticate){
              axios.get(BASE_URL+`/customer-check-wishlist/?customer=${user.user.id}&product=${props.id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
                  .then(response=>{
                    setUserWishlist(response.data)
                    setLoading(false)
                  })
                  .catch(error=>{
                  })
              }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
      useEffect(()=>{
        toast.remove();
          if(user.isAuthenticate){
            checkUserWishlist();
           }
      },[])
    return (
      <div>
          <div><Toaster /></div>
          <div className="card product-card" >
                      <div className="product-card-wishlist-icon" style={{borderBottomLeftRadius:"20px",backgroundColor:"#e6e8e7"}}>
                        {
                          userWishlist.is_wishlist
                          ?
                            <FavoriteIcon onClick={()=>{vibrate();removeFromWishlist(userWishlist.id)}} fontSize="large" className="cursor-pointer text-danger"/>
                          :
                        <FavoriteBorderOutlinedIcon onClick={()=>{vibrate();addToWishlist(props.id)}} fontSize="large" className="cursor-pointer" style={{color:"#b6b8b7"}}/>
                       
                        }
                        </div>
                      <Link to={`/product/${props.title}/${props.id}`}>
                      <ProgressiveImage src={props.image} placeholder={yas}>
                          {(src, loading) => (
                            <img
                              className={`card-img-top product-card-img${loading ? " loading" : " loaded"}`}
                              src={src}
                              alt={props.title}
                            />
                            )}
                          </ProgressiveImage>
                      {/* <img src={props.image} className="card-img-top product-card-img"/> */}
                        </Link>
                      <div className="card-body p-2">
                        <Link to={`/product/${props.title}/${props.id}`} className="text-decoration-none">
                        <p className="card-title fw-bold product-card-title" style={{fontSize:"14px"}}>{props.title.slice(0,35)}...</p>
                        </Link>
                        <p className="card-title text-dark fw-600">₹ {props.price}</p>
                        <span>
                          <small className="text-secondary">{props.rating}</small><StarIcon style={{color:'#ffd400'}} fontSize=""/>
                        </span>
                      </div>
                    </div>
          </div>
          
      )
}

export default SingleProduct;