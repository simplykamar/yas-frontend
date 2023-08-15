import {Link,useParams,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarIcon from '@mui/icons-material/Star';
import './ProductDetail.css';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import ProgressiveImage from "react-progressive-graceful-image";
import yas from '../../images/other/yas.png'

const ProductDetail = () => {
  const BASE_URL = 'https://yasonlinegifting.pythonanywhere.com/api';
  const {product_id} = useParams();
  const [product,setProduct] = useState([])
	const [productTags,setProductTags] = useState([])  
	const [ quantity, setQuantity ] = useState(1);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const [ selectedImage, setSelectedImage ] = useState('0');
  const [userWishlist,setUserWishlist] = useState({is_wishlist:false,id:null})
  const navigate = useNavigate()
  const user = useSelector((state)=>state.auth);
	const cartData = useSelector((state)=>state.cart.products);

	const notifySuccess = (text) => toast.success(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
	const notifyError = (text) => toast.error(text,{style:{boxShadow:'none',border:'.5px solid #f5f7f6'}});
 
 function vibrate(){
    if(!("vibrate" in navigator)){
       return;
  }
  navigator.vibrate(100);
}
  const fetchData = async (baseurl) => {
      await fetch(baseurl)
              .then((response)=>response.json())
              .then((data)=>{
                setProduct(data);
                setLoading(false);
                setProductTags(data.tag_list)
                
              });
    }
    function removeFromWishlist(id){
          notifySuccess('Remove from wishlist.');
          if(user.isAuthenticate){
            axios.delete(BASE_URL+`/customer-wishlist/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
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
          notifySuccess('Added to wishlist.');
          if(user.isAuthenticate){
          const formData = new FormData();
          formData.append('product',id);
          formData.append('customer',user.user.id);
           axios.post(BASE_URL+`/customer-wishlist/`,formData,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
             console.log(response);
            checkUserWishlist();
           })
           .catch(error=>{
           	notifyError('Error try again!');
           	console.log(error)
         })
           }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
   function checkUserWishlist(){
          if(user.isAuthenticate){
        axios.get(BASE_URL+`/customer-check-wishlist/?customer=${user.user.id}&product=${product_id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
              .then(response=>{
                setUserWishlist(response.data)
              })
              .catch(error=>{
                console.log(error)
              })
              }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
    useEffect(()=>{
    	window.scrollTo(0,0);
    	toast.remove();
        fetchData(BASE_URL+'/product/'+product_id);
          if(user.isAuthenticate){
        			checkUserWishlist();
        }
      },[product_id,]);

    const tagLinks = []
   for (let i = 0; i<productTags.length; i++){
   		let tag = productTags[i].trim();
   		tagLinks.push(<Link to={`/products/${tag}`} className="badge bg-outline-pink ms-2 text-decoration-none text-capitalize" key={i}>{tag}</Link>)
   } 
	return(
		<div className="container-fluid pt-lg-3 pt-md-3">
          <div><Toaster/></div>
		{ !loading
			?
			<div className="row">
				<div className="col-lg-5 col-md-5 col-sm-12 col-12">
					<div className="row">
						<div className="col-lg-2 col-md-2 d-none d-lg-block d-md-block">
							{ 
						product.product_imgs?.map((img,index)=>{return(
						 <ProgressiveImage src={img.image} placeholder={yas}>
               {(src, loading) => (
                 <img
                    className={`img-fluid img-thumbnail mt-3 cursor-pointer${loading ? " loading" : " loaded"}`}
                		src={src}
                 />
                 )}
               </ProgressiveImage>
						// <img src={img.image} key={img.id} className="img-fluid img-thumbnail mt-3 cursor-pointer" onClick={()=>{setSelectedImage(index)}}/>
						)})
					}
						</div>
						<div className="col-lg-9 col-md-9 col-sm-12 col-12">
							<InnerImageZoom src={product.product_imgs[selectedImage].image} zoomScale={1.5} zoomType="hover" zoomSrc={product.product_imgs[selectedImage].image} className="set-min-width" />
								{/* <img src={product.product_imgs[selectedImage].image} className="img-fluid" style={{minWidth:'100%'}}/>							 */}
						</div>
					</div>
					<div className="row mt-2 d-lg-none d-md-none">
					{	
						product.product_imgs?.map((img,index)=>{return(
						<div className="col-lg-3 col-md-3 col-sm-3 col-3" key={img.id}>
							<img src={img.image} className="img-fluid cursor-pointer" onClick={()=>{setSelectedImage(index)}}/>
						</div>
						
						)})
					}
					</div>
				</div>
				<div className="col-lg-7 col-md-7 col-sm-12 col-12 pb-4">
					<h4 className="text-dark mt-3">{product.title}</h4>
					{/* <p> {product.detail}</p> */}
					<p><small className="text-secondary">{product.rating}</small><StarIcon style={{color:'#ffd400'}} fontSize=""/> | 186 Rating</p>
					 <h5>₹{product.price}<span className="text-secondary ms-2" style={{fontSize:"16px"}}> </span></h5>
					 <p className="text-success fw-600">inclusive of all taxes</p>
						<div className="d-none d-lg-block d-md-block">
						 	<div className="mt-4 d-flex">
								 <div className="">
								 {
								 		cartData.find((item)=>item.id==product_id)?
								 <Link to="/checkout" className="btn btn-pink text-uppercase fw-600"> <ShoppingBagOutlinedIcon className="mb-1 me-1"/>Go to bag
								</Link>
								:
								<button className="btn btn-pink text-uppercase fw-600" onClick={()=>{dispatch(addToCart({
								 		id:product.id,
										title:product.title,
										price:product.price,
										detail:product.detail,
										quantity,
										img:product.product_imgs[0].image
								 }));
								 notifySuccess('Item added to cart');
								}
								}> <ShoppingBagOutlinedIcon className="mb-1 me-1"/>Add To bag
								</button>
								}
								</div>
	               {
	               	!loading?
	                userWishlist.is_wishlist
	                ?
	                <div><button className="btn btn-white ms-5 border fw-600" onClick={()=>{removeFromWishlist(userWishlist.id)}}>
	               		<FavoriteIcon className="text-danger me-1"/>
									Wishlist
								 </button></div>
								 :
	                <div><button className="btn btn-white ms-5 border fw-600" onClick={()=>{addToWishlist(product_id)}}>
									<FavoriteBorderOutlinedIcon className="me-1"/>
									Wishlist
								 </button></div>
								 :""
								}
							</div>
						</div>
								{/* for mobile view */}
						<div className="d-lg-none d-md-none">
								<div className="mt-4 d-flex justify-content-center fixed-bottom bg-white shadow py-2">
               {
               	!loading?
                userWishlist.is_wishlist
                ?
                <div>
	                <button className="btn btn-white me-5 py-2 border" onClick={()=>{vibrate();removeFromWishlist(userWishlist.id)}}>
	               		<FavoriteIcon className="text-danger me-1"/>
									Wishlist
								 </button>
							 </div>
							 :
                <div>
	                <button className="btn btn-white me-5 py-2 border" onClick={()=>{vibrate();addToWishlist(product_id)}}>
									<FavoriteBorderOutlinedIcon className="me-1"/>
									Wishlist
								 </button>
							 </div>
							 :""
							}
							   <div className="">
							 {
								 		cartData.find((item)=>item.id==product_id)?
								 <Link to="/checkout" className="btn btn-pink text-uppercase fw-600"> <ShoppingBagOutlinedIcon className="mb-1 me-1"/>Go to bag
								</Link>
								:
								<button className="btn btn-pink text-uppercase fw-600" onClick={()=>{vibrate();dispatch(addToCart({
								 		id:product.id,
										title:product.title,
										price:product.price,
										detail:product.detail,
										quantity,
										img:product.product_imgs[0].image
								 }));
								 notifySuccess('Item added to cart');
								}
								}> <ShoppingBagOutlinedIcon className="mb-1 me-1"/>Add To bag
								</button>
								}
							</div>
						</div>
						</div>
						<div className="mt-4">
							<p className="fw-600 mb-1">Description</p>
							<p className=" text-secondary text-justify">{product.detail}</p>
						</div>
						<h5>Tags</h5>
							{tagLinks}
				</div>
			</div>
			:
             <div className="text-center py-4">
                <div className="spinner-border text-danger"></div>
              </div>
			}
		</div>
		)
}
export default ProductDetail;