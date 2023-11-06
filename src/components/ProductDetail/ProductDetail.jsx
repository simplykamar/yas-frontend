import {Helmet} from 'react-helmet';
import './ProductDetail.css';
import ProductViewSkeleton from '../LoadingSkeleton/ProductViewSkeleton';
import yas from '../../images/other/yas.png'
import CropperImg from './ImageCrop';
import Uploading from '../Loading/Uploading';
import Personalizing from '../Loading/Personalizing';
import RecentlyViewed from './RecentlyViewed'
import SimilarGifts from './SimilarGifts'
import ProductImageSlider from './ProductImageSlider'
import ProductReviews from './ProductReviews'

import StarsIcon from '@mui/icons-material/Stars';
import DiamondIcon from '@mui/icons-material/Diamond';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {Link,useParams,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import ProgressiveImage from "react-progressive-graceful-image";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// import CheckIcon from '@mui/icons-material/Check';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';

const ProductDetail = () => {
  // const BASE_URL = 'http://127.0.0.1:8000/api';
  const BASE_URL = 'https://simplykamar.tech/api';
  const {product_id} = useParams();
  const {product_slug} = useParams();
  const [product,setProduct] = useState([])
	const [ quantity, setQuantity ] = useState(1);
	const [ selectedImage, setSelectedImage ] = useState('0');
  const [userWishlist,setUserWishlist] = useState({is_wishlist:false,id:null})
	const [loading, setLoading] = useState(true);
	const [productPersonalizeImgs, setProductPersonalizeImgs] = useState([])
	const [productPersonalizeText, setProductPersonalizeText] = useState([])
	const [uploading, setUploading] = useState(false);
	const [textPersonalizing, setTextPersonalizing] = useState(false);
	const [inputError,setInputError] = useState(false)
	const [personalizeTextTemp,setPersonalizeTextTemp] = useState(null)
	const [productImgs, setProductImgs] = useState([])
	const dispatch = useDispatch();
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
      await axios.get(baseurl)
              .then((response)=>{
              	// console.log(response)
              	setProduct(response.data);
              	setProductImgs(response.data.product_imgs)
                setLoading(false);
            })
             .catch(error=>{
	           	notifyError('Server Error!');
	           	// console.log(error)
	         })
    }
    function removeFromWishlist(id){
          notifySuccess('Remove from wishlist.');
          if(user.isAuthenticate){
            axios.delete(BASE_URL+`/customer-wishlist/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
            checkUserWishlist();
           })
          .catch(error=>{
           	notifyError('Server Error!');
           	// console.log(error)
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
             // console.log(response);
            checkUserWishlist();
           })
           .catch(error=>{
           	notifyError('Server Error!');
           	// console.log(error)
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
	           	notifyError('Server Error!');
	           	// console.log(error)
	         })
        }
          else{
              navigate('/customer/login',{replace:true})
          }
   }
	 async function uploadImage(item){
	 	setUploading(true);
   	const formData = new FormData();
   	formData.append('image',item.image);
	 	await axios.post(BASE_URL+'/upload-image/',formData,{headers:{"Content-Type": 'multipart/form-data'}})
   	.then(response=>{
   		// console.log(response);
   		item.image = response.data.image;
   		item.imageId = response.data.id;
   		productPersonalizeImageHandler(item);
	 		setUploading(false);
   	})
   	.catch(error=>{
   		notifyError('Server Error!');
	 		setUploading(false);
   	})
	 }
	 function updatePersonalizeImgs(itemID,serverPersonalizedImg){
	 	// console.log('serverPersonalizedImg',serverPersonalizedImg)
	   		// update cutomer uploaded image with server personalize image
				const newSate = productPersonalizeImgs.map(obj=>{
		   		if (obj.id === itemID){
		   			return {...obj,image:serverPersonalizedImg,isPersonalized:true};
		   		}
   		return obj;
	   		});
   		setProductPersonalizeImgs(newSate);
 	 }

   function productPersonalizeImageHandler(item){
   	const itemExist = productPersonalizeImgs.find(obj=>obj.id===item.id);
   	if (itemExist){
   		const newSate = productPersonalizeImgs.map(obj=>{
   		if (obj.id === item.id){
   			return {...obj,imageId:item.imageId,image:item.image,isPersonalized:item.isPersonalized};
   		}
   		return obj;
   	});
   		setProductPersonalizeImgs(newSate);
   		// console.log(productPersonalizeImgs)
   	}else{
   		// console.log("item not exist")
   		setProductPersonalizeImgs(productPersonalizeImgs=>[...productPersonalizeImgs,item])
   	// console.log(productPersonalizeImgs)

   	}
 }

async function applyTextPersonalization(itemID){
		// console.log('itemID',itemID);
		const item = productPersonalizeText.find(item=>item.id===itemID);
		if(item){
	 			setTextPersonalizing(true);
				const formData = new FormData();
		    formData.append('itemID',JSON.stringify(itemID));
		    formData.append('text',JSON.stringify(item.text));
					await axios.post(BASE_URL+'/apply-text-personalization/',formData)
				    .then(response=>{
				    	if(response.status===200){
				    	updatePersonalizeTexts(itemID,response.data.image)
				      // console.log(response);
				      setTextPersonalizing(false);
				    }
		      else if(response.status===400){
		        alert(response.msg)
		      }
				    })
				    .catch(error=>{
   						notifyError('Server Error!');
				      // console.log(error);
				      setTextPersonalizing(false);
				    }) 
		}else{
				setInputError(true);
		}
 	 }

 function updatePersonalizeTexts(itemID,serverPersonalizedImg){
				const newSate = productPersonalizeText.map(obj=>{
		   		if (obj.id === itemID){
		   			return {...obj,image:serverPersonalizedImg,isPersonalized:true};
		   		}
   		return obj;
	   		});
   		setProductPersonalizeText(newSate);
 	 }

  function productPersonalizeTextHandler(item){
   	const itemExist = productPersonalizeText.find(obj=>obj.id===item.id)
   	if (itemExist){
   		const newSate = productPersonalizeText.map(obj=>{
   		if (obj.id === item.id){
   			return {...obj,text:item.text};
   		}
   		return obj;
   	});
   		setProductPersonalizeText(newSate);
   		// console.log(productPersonalizeText)
   	}else{
   		console.log("text item not exist")
   		setProductPersonalizeText(productPersonalizeText=>[...productPersonalizeText,item])
   	// console.log(productPersonalizeText)

   	}
 }

 function validate(){
 	let personalizeTextValidate = false;
 	let personalizeImageValidate = false;
 		if(product.is_personalize_text && (productPersonalizeText.length===product.product_personalize_text.length)){
 			personalizeTextValidate = productPersonalizeText.every(item=>item.isPersonalized);
 		}
 		if(product.is_personalize_image && (productPersonalizeImgs.length===product.product_personalize_imgs.length)){
 			let validatePersonalized = false;
 			validatePersonalized = productPersonalizeImgs.every(item=>item.isPersonalized)
 			console.log(productPersonalizeImgs)
 			console.log(validatePersonalized)
 			if(validatePersonalized){
 				personalizeImageValidate = true;
 			}
 		}
 		if(product.is_personalize_text && product.is_personalize_image){
 			if(personalizeTextValidate && personalizeImageValidate){
	 			setInputError(false);
	 			vibrate();
 				dispatch(addToCart({
					id:product.id,
					title:product.title,
					price:product.price,
					detail:product.detail,
					isStock:true,
					quantity,
					// img:product.product_imgs[0].image,
					img:productPersonalizeImgs[0].image,
					is_personalize:product.is_personalize,
					personalize_imgs:productPersonalizeImgs,
					personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
			 // Add all personalize images to product details view
 		 	setProductImgs([...productPersonalizeImgs,...productPersonalizeText,...productImgs]) 
 				}else{
			 			setInputError(true);
 				}
 		}
 		else if(product.is_personalize_text && personalizeTextValidate){
 				vibrate();
 				dispatch(addToCart({
					id:product.id,
					title:product.title,
					price:product.price,
					detail:product.detail,
					isStock:true,
					quantity,
					// img:product.product_imgs[0].image,
					img:productPersonalizeText[0].image,
					is_personalize:product.is_personalize,
					// personalize_imgs:productPersonalizeImgs,
					personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
			 // Add all personalize images to product details view
 		 	setProductImgs([...productPersonalizeText,...productImgs]) 
 			setInputError(false);
 		}
 		else if(product.is_personalize_image && personalizeImageValidate){
 				vibrate();
 				dispatch(addToCart({
					id:product.id,
					title:product.title,
					price:product.price,
					detail:product.detail,
					isStock:true,
					quantity,
					img:productPersonalizeImgs[0].image,
					is_personalize:product.is_personalize,
					personalize_imgs:productPersonalizeImgs,
					// personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
			 // Add all personalize images to product details view
 		 	setProductImgs([...productPersonalizeImgs,...productImgs]) 
 			setInputError(false);
 		}
 		else{
 			// console.log(personalizeTextValidate)
 			// console.log(personalizeImageValidate)
 			setInputError(true);
 		}
}

    useEffect(()=>{
    	toast.remove();
      fetchData(BASE_URL+'/product/'+product_id);
    	window.scrollTo(0,0);
          if(user.isAuthenticate){
        			checkUserWishlist();
        }
      },[product_id,]);
 
	return(
		<div className="container-fluid pt-lg-3 pt-md-3">
		<Helmet>
          <meta charSet="utf-8"/>
          <title>{product_slug}</title>
          <meta
           name="description"
           content={product.detail}
          />
         <meta
           name="keywords"
           content="personalized gifts, customized gifts, unique personalised gifts, customized gifts online, customized gifts online india, buy personalised gifts, send personalised gifts to india, personalized photo gifts, personalised gifts, custom gifts online, Magic Mugs, Cushions, Caricature, LED Lamps, Photo Gifts, Keychains, bottle, Photo Frames."
          />
      </Helmet>
          <div><Toaster/></div>
          <Uploading uploading={uploading}/>
          <Personalizing personalizing={textPersonalizing}/>
		{ !loading
			?
			<div className="row">
				<div className="col-lg-5 col-md-5 col-sm-12 col-12 ">
				<div className="d-none d-lg-block d-md-block">
					<div className="row ">
						<div className="col-lg-2 col-md-2 ">
							{ 
						productImgs?.map((img,index)=>{return(
						 <ProgressiveImage src={img.image} placeholder={yas} key={index+1}>
               {(src, loading) => (
                 <img
                    className={`img-fluid rounded mt-3 cursor-pointer${loading ? " loading" : " loaded"}`}
                		src={src}
                		alt="product image"
                		onClick={()=>{setSelectedImage(index)}}
                		style={img.isPersonalized&&{border:'1px solid yellow'}}
                 />

                 )}
               </ProgressiveImage>
						// <img src={img.image} key={img.id} className="img-fluid img-thumbnail mt-3 cursor-pointer" onClick={()=>{setSelectedImage(index)}}/>
						)})
					}
						</div>
						<div className="col-lg-9 col-md-9 col-sm-12 col-12">
							<InnerImageZoom src={productImgs.length?productImgs[selectedImage].image:yas} zoomScale={1.5} zoomType="hover" zoomSrc={productImgs.length?productImgs[selectedImage].image:yas} className="set-min-width" />
								{/* <img src={product.product_imgs[selectedImage].image} className="img-fluid" style={{minWidth:'100%'}}/>							 */}
						</div>
					</div>
					</div>
					{/* for mobile view */}
					<div className="mt-1 d-lg-none d-md-none">
						<ProductImageSlider productImgs={productImgs.length?productImgs:[yas,]}/>
					</div>
				</div>
				<div className="col-lg-7 col-md-7 col-sm-12 col-12 pt-3 pt-lg-0 pt-md-0 ">
				<small className="yas-text-secondary text-small">
							{
                (product.label===2)&& <span className=" rounded-3 px-2 fs-12" style={{color:'white',backgroundColor:'#fc7e93'}}>Bestseller <StarsIcon fontSize=""/></span>
              }
              {
                (product.label===3)&& <span className=" rounded-3 px-2 fs-12" style={{color:'white',backgroundColor:'#fc7e93'}}>Special Offer <StarsIcon fontSize=""/></span>
              }
              {
                (product.label===4)&& <span className="rounded-3 px-2 fs-12" style={{color:'white',backgroundColor:'#fc7e93'}}>Premium <DiamondIcon fontSize=""/></span>
              }
              {
                (product.label===5)&& <span className=" rounded-3 px-2 fs-12" style={{color:'white',backgroundColor:'#fc7e93'}}>Value Pack <CurrencyRupeeIcon fontSize=""/></span>
              }
              {
                (product.label===6)&& <span className=" rounded-3 px-2 fs-12" style={{color:'white',backgroundColor:'#fc7e93'}}>Top Rated #1</span>
              }
				</small>
					<h4 className="text-dark">{product.title}</h4>
					 <h5>₹ {product.price}
					  {
               (product.discount!==0)&&
               <>
                 <span className="text-decoration-line-through text-light-gray mx-2" style={{fontSize:'14px'}}>₹ {product.old_price}</span> 
                 <span>
                   <span className="p-1" style={{border:'1px solid #35b847',color:'#35b847',borderRadius:'5px',fontSize:'10px'}}> {product.discount}% OFF</span> 
                 </span>                            
               </>
           }
           </h5>
           {
           	product.is_stock
           	?
           	(product.available_quantity<5)&& <small className="text-small" style={{color:'#d8392b'}}>Only {product.available_quantity} Items left in stock</small>
           	:""
           }
					 <p className="text-success fw-600 text-small">inclusive of all taxes</p>
					 {!product.is_stock && <small className="text-small" style={{color:'#d8392b'}}>This product is currently out of stock.</small>}
						{/* desktop view */}
						<div className="d-none d-lg-block d-md-block">
						 	<div className="mt-4 d-flex">
								 <div className="">
								 {
								 	product.is_stock
								 	?
										 	cartData.find((item)=>item.id==product_id)
										 	?
										 <Link to="/checkout" className="btn btn-pink text-uppercase fw-600"> <ShoppingCartOutlinedIcon className="mb-1 me-1"/>Go to cart
										</Link>
											:
												product.is_personalize
												?
												<>
												<button className="btn btn-pink text-uppercase fw-600" data-bs-toggle="modal" data-bs-target="#personalizeModal" >
													 <DriveFileRenameOutlineOutlinedIcon className="mb-1 me-1"/>personalize now
												</button>
												</>
												:
													<button className="btn btn-pink text-uppercase fw-600" onClick={()=>{dispatch(addToCart({
													 		id:product.id,
															title:product.title,
															price:product.price,
															detail:product.detail,
															isStock:true,
															quantity,
															img:product.product_imgs[0].image,
															is_personalize:product.is_personalize
													 }));
													 notifySuccess('Item added to cart');
													}
													}>
													 <ShoppingCartOutlinedIcon className="mb-1 me-1"/>Add To cart
												</button>

									:
									<button className="text-capitalize btn bg-outline-pink rounded-15" style={{cursor:'text'}}>out of stock</button>
								}
								</div>
	               {
	               	!loading?
	                userWishlist.is_wishlist
	                ?
	                <div><button className="btn text-hover-pink ms-5 fw-600" onClick={()=>{removeFromWishlist(userWishlist.id)}}>
	               		<FavoriteIcon className="text-danger me-1"/>
									Wishlist
								 </button></div>
								 :
	                <div><button className="btn text-hover-pink ms-5 fw-600" onClick={()=>{addToWishlist(product_id)}}>
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
	                <button className="btn text-hover-pink me-5 py-2" onClick={()=>{vibrate();removeFromWishlist(userWishlist.id)}}>
	               		<FavoriteIcon className="text-danger me-1"/>
									Wishlist
								 </button>
							 </div>
							 :
                <div>
	                <button className="btn text-hover-pink me-5 py-2" onClick={()=>{vibrate();addToWishlist(product_id)}}>
									<FavoriteBorderOutlinedIcon className="me-1"/>
									Wishlist
								 </button>
							 </div>
							 :""
							}
							   <div className="">
							 {
								 	product.is_stock
								 	?
										 	cartData.find((item)=>item.id==product_id)
										 	?
										 <Link to="/checkout" className="btn btn-pink text-uppercase fw-600"> <ShoppingCartOutlinedIcon className="mb-1 me-1"/>Go to cart
										</Link>
											:
												product.is_personalize
												?
												<>
												<button className="btn btn-pink text-uppercase fw-600 fs-14" data-bs-toggle="modal" data-bs-target="#personalizeModal" >
													 <DriveFileRenameOutlineOutlinedIcon className="mb-1 me-1"/>personalize now
												</button>
												</>
												:
													<button className="btn btn-pink text-uppercase fw-600" onClick={()=>{vibrate();dispatch(addToCart({
													 		id:product.id,
															title:product.title,
															price:product.price,
															detail:product.detail,
															isStock:true,
															quantity,
															img:product.product_imgs[0].image,
															is_personalize:product.is_personalize
													 }));
													 notifySuccess('Item added to cart');
													}
													}>
													 <ShoppingCartOutlinedIcon className="mb-1 me-1"/>Add To cart
												</button>

									:
									<button className="text-capitalize btn bg-outline-pink rounded-15" style={{cursor:'text'}}>out of stock</button>
								}
							</div>
						</div>
						</div>
						<div className="mt-4">
							<p className="fw-600 mb-1">Description</p>
							{/* <p className=" text-secondary text-justify">{product.detail}</p> */}
							<div dangerouslySetInnerHTML={{__html:product.detail}} className="fs-14 text-justify"></div>
							<small className="text-uppercase fs-12"><span style={{color:'#4f4f4f',fontWeight:'bold'}}>sku:</span> <span className="px-2 py-1 rounded-1" style={{color:'#4f4f4f',backgroundColor:'#f6f6f6',letterSpacing:'1px'}}>{product.sku}</span></small>
						</div>
						{
							product.product_info &&
						<div className="mt-3">
							<p className="fw-600 mb-1">Product Info</p>
							<div dangerouslySetInnerHTML={{__html:product.product_info}} className="fs-14"></div>
						</div>
						}
				</div>
			</div>
			:
        <ProductViewSkeleton/>
			}
			{/* Personalize modal */}
                         <div className="modal " id="personalizeModal">
                            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <p className="modal-title fw-600 text-heading">{product.title}</p>
                                  <CloseIcon fontSize="small" className="cursor-pointer btn-close" data-bs-dismiss="modal"/>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-1">
	                                <div className="sticky-top bg-white py-1">
		                                <div className="d-flex justify-content-between">
		                                	<p className="fw-600 text-heading">Start Personalizing</p>
		                                	<Link to= "" className="text-decoration-none fw-bold text-danger" onClick={()=>{setProductPersonalizeText([]);setProductPersonalizeImgs([])}}>
		                                	<RestoreOutlinedIcon className="mb-1" fontSize="small"/> Reset All
		                                	</Link>	
		                                </div>
	                               	</div>
		                                <small className="text-small text-secondary"><AccessTimeOutlinedIcon style={{fontSize:'14px'}}/> It takes just about a minute</small>
	                                <div>
	                                {!loading &&
	                                		product.is_personalize &&
	                                		<>
	                                		{
	                                			product.is_personalize_image&&
			                                		product.product_personalize_imgs.map((item,i)=>{
			                                			return(
			                                				<div className="mt-3" key={item.id}>
			                                						<div className="text-center" >
			                                						{/* for desktop */}
			                                						<div className="d-none d-md-block d-lg-block">
			                                							<img src={item.image} className="img-fluid w-25"/>
			                                						</div>
			                                						{/* for mobile */}
			                                						<div className="d-md-none d-lg-none">
			                                							<img src={item.image} className="img-fluid w-75"/>
			                                						</div>
	                                            		{
	                                            			!uploading?
	                                            			productPersonalizeImgs.map((obj,imgIndex)=>{
	                                            				if (obj.id===item.id){
	                                            					if (obj.isPersonalized){
	                                            						return (
	                                            									<div key={obj.id}>
	                                            										<small className="my-2 d-block text-small mt-2" > 
	                                           									 		 <img src={obj.image} className="img-fluid me-2" style={{width:'30px',height:'30px'}}/> 
	                                        													<a href={obj.image} target="blank">View personalize image</a>
	                                        												</small> 
	                                        											</div>
	                                            							)
	                                            				}else{
	                                            					return (
						                                         							<div key={obj.id} className="pt-3">
						                                         								<CropperImg itemID={item.id} uploadedImgId={obj.imageId} img={obj.image} updatePersonalizeImgs={updatePersonalizeImgs} aspectRatio={item.aspect_ratio}/>
			                                        										</div>
				                                         						)
	                                            				}
	                                            			}
	                                            			})
	                                            			:''
	                                            		}
			                                					</div>
			                                					<div className="text-center">
				                                          <Button variant="outlined" color="error" className="py-1 my-3 rounded-15 " component="label">
						                                      	{
				                                            	productPersonalizeImgs.find(obj=>obj.id===item.id)
				                                            	?<span className="fs-12"><InsertPhotoOutlinedIcon fontSize="small"/> Change image {i+1}</span>
				                                            	:<span className="fs-12"><InsertPhotoOutlinedIcon fontSize="small"/> Upload image {i+1}</span>
	                                            		}
						                                          <input hidden accept="image/*" type="file" 
						                                          onChange={(e)=>{e.target.files[0]&&uploadImage({id:item.id,image:e.target.files[0],sample_image_url:item.image,isPersonalized:false})}}/>
				                                         	</Button>
		                                         		</div>

			                                					<div className="d-flex justify-content-center">
				                                					<ul className="text-secondary">
									                                	<li><span className="text-secondary fs-12">Please upload good quality image.</span></li>
									                                	<li><span className="text-secondary fs-12">Please ensure you have rights to use the image.</span></li>
									                                </ul>
			                                					</div>
		                                				</div>
		                                				)
	                                			})
	                                		}
	                                		{
	                                			product.is_personalize_text &&
				                              			product.product_personalize_text.map((item,i)=>{
			                                			return(
			                                				<div className="mt-3 text-center" key={item.id}>
					                              				{/* for desktop */}
			                                						<div className="d-none d-md-block d-lg-block">
			                                							<img src={item.image} className="img-fluid w-25"/>
			                                						</div>
			                                						{/* for mobile */}
			                                						<div className="d-md-none d-lg-none">
			                                							<img src={item.image} className="img-fluid w-75"/>
			                                						</div>
					                              				 {
	                                            			productPersonalizeText.map((obj)=>{
	                                            				if (obj.id===item.id){
	                                            					if (obj.isPersonalized){
	                                            						return (
	                                            								!textPersonalizing?
	                                            									<div key={obj.id}>
											                      		     							<small className="my-2 d-block text-small mt-2" > 
	                                           									 		 <img src={obj.image} className="img-fluid me-2" style={{width:'30px',height:'30px'}}/> 
	                                        													<a href={obj.image} target="blank">View personalize image</a>
	                                        												</small> 
	                                        											</div>
	                                        											:
	                                        											''
	                                            							)
	                                            					}
	                                            			}
	                                            		})
	                                            	}
											                        	   {/* For mobile view */}
					                              				<div className="my-3 d-lg-none d-md-none">
						                              				<div className=" ">
							                              				<div className="fs-12 text-secondary my-3">
							                              					<small>Text {i+1} (Upto {item.text_length} characters)</small>
							                              				</div>
													                      		     <TextField
															                      		    color="error"
								                                          	onChange={(e)=>{productPersonalizeTextHandler({id:item.id,image:null,text:e.target.value,sample_image_url:item.image,isPersonalized:false})}}
															                      		    name={`text${i+1}`}
															                      		    fullWidth
															                      		    label={`Enter text ${i+1}`}
															                      		    inputProps={{ maxLength: item.text_length }}
															                      		    InputLabelProps={{style: {fontSize: '14px'}}}
															                      		    size="small"
													                      		   />
													                      		   <div className="text-end mt-2">
													                      		   	<Button variant="outlined" color="error" className="rounded-15 fs-12" onClick={()=>{applyTextPersonalization(item.id)}}>Save</Button>
													                      		   </div>
												                        	   </div>
											                        	   </div>
											                        	   {/* For desktop view */}
											                        	   <div className="my-3 d-none d-md-block d-lg-block">
												                        	   <div className="d-flex justify-content-center">
													                        	   <div className="w-50">
									                              				<div className="text-small text-secondary my-2">
									                              					<small>Text {i+1} (Upto {item.text_length} characters)</small>
									                              				</div>
															                      		     <TextField
																	                      		    color="error"
										                                          	onChange={(e)=>{productPersonalizeTextHandler({id:item.id,image:null,text:e.target.value,sample_image_url:item.image,isPersonalized:false})}}
																	                      		    name={`text${i+1}`}
																	                      		    fullWidth
																	                      		    label={`Enter text ${i+1}`}
																	                      		    inputProps={{ maxLength: item.text_length }}
																	                      		    InputLabelProps={{style: {fontSize: '14px'}}}
																	                      		    size="small"
															                      		   />
															                      		   <div className="text-end mt-2">
															                      		   	<Button variant="outlined" color="error" className="rounded-15 fs-12" onClick={()=>{applyTextPersonalization(item.id)}}>Save</Button>
															                      		   </div>
													                        	   </div>
												                        	   </div>
											                        	   </div>
		                                				</div>
		                                				)
	                                			})
		                                	}
			                               </>
	                                	}
	                                	{
			                           	 	inputError
			                           	 	&&
	            		                   	<div className="text-pink mb-3 fw-bold fs-12">This product needs to be personalized before adding to the cart.</div>
			                           	 }
			                           	 {
			                           	 	cartData.find((item)=>item.id==product_id)
										 								?
																			<div className="text-center">
	                                		<button data-bs-dismiss="modal" className="btn btn-pink fs-14 text-uppercase py-1 px-5 py-md-2 px-md-5 ">
		                                	 <span ><KeyboardBackspaceOutlinedIcon/> Go back</span>
																			</button>
			                           	 	</div>
			                           	 :
			                           	 	<div className="text-center">
	                                		<button className="btn btn-pink fs-14 text-uppercase py-2 px-5 py-md-2 px-md-5 " onClick={validate}>
			                           	 			submit
			                           	 		</button>
			                           	 	</div>
			                           	 }
	                                </div>
                                </div>

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                </div>
                              </div>
                            </div>
                          </div>
         {
         	!loading&&
						product.product_reviews.length?
	         	<ProductReviews productReviews={product.product_reviews}/>
         	:''
         }
         <SimilarGifts productId={product_id}/>
         {
         	user.isAuthenticate&&
         	<RecentlyViewed productId={product_id}/>
					}
		</div>
		)
}
export default ProductDetail;