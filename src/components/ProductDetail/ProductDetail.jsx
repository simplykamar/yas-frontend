import {Link,useParams,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import StarIcon from '@mui/icons-material/Star';
import './ProductDetail.css';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import ProgressiveImage from "react-progressive-graceful-image";
import yas from '../../images/other/yas.png'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import CropperImg from './ImageCrop';

const ProductDetail = () => {
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const {product_id} = useParams();
  const {product_slug} = useParams();
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
	const [productPersonalizeImgs, setProductPersonalizeImgs] = useState([])
	const [productPersonalizeText, setProductPersonalizeText] = useState([])
	const [uploading, setUploading] = useState(false);
	const [uploadedImage, setUploadedImage] = useState(null)
	const [inputError,setInputError] = useState(false)
	const [personalizeTextTemp,setPersonalizeTextTemp] = useState(null)
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
              	console.log(response)
              	setProduct(response.data);
                setLoading(false);
                setProductTags(response.data.product_tags)
            })
              .catch((error)=>{
              	console.log(error)
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
	 async function uploadImage(item){
	 	setUploading(true);
   	const formData = new FormData();
   	formData.append('image',item.image);
	 	await axios.post(BASE_URL+'/upload-image/',formData,{headers:{"Content-Type": 'multipart/form-data'}})
   	.then(response=>{
   		console.log(response);
   		item.image = response.data.image;
   		item.imageId = response.data.id;
   		productPersonalizeImageHandler(item);
	 		setUploading(false);
   	})
   	.catch(error=>{
   		console.log(error);
	 		setUploading(false);
   	})
	 }
	 function updatePersonalizeImgs(itemID,serverPersonalizedImg){
	 	console.log('serverPersonalizedImg',serverPersonalizedImg)
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
   		console.log(productPersonalizeImgs)
   	}else{
   		console.log("item not exist")
   		setProductPersonalizeImgs(productPersonalizeImgs=>[...productPersonalizeImgs,item])
   	console.log(productPersonalizeImgs)

   	}
 }

async function applyTextPersonalization(itemID){
		console.log('itemID',itemID);
		const item = productPersonalizeText.find(item=>item.id===itemID);
		console.log("item",item);
    const formData = new FormData();
    formData.append('itemID',JSON.stringify(itemID));
    formData.append('text',JSON.stringify(item.text));
			await axios.post(BASE_URL+'/apply-text-personalization/',formData)
		    .then(response=>{
		    	updatePersonalizeTexts(itemID,response.data.image)
		      console.log(response);

		    })
		    .catch(error=>{
		      console.log(error);
		    }) 
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
   		console.log(productPersonalizeText)
   	}else{
   		console.log("text item not exist")
   		setProductPersonalizeText(productPersonalizeText=>[...productPersonalizeText,item])
   	console.log(productPersonalizeText)

   	}
 }

 function validate(){
 	let personalizeTextValidate = false;
 	let personalizeImageValidate = false;
 		if(product.is_personalize_text && (productPersonalizeText.length===product.product_personalize_text.length)){
 			personalizeTextValidate = productPersonalizeText.every(item=>item.text.length);
 		}
 		if(product.is_personalize_image && (productPersonalizeImgs.length===product.product_personalize_imgs.length)){
 			personalizeImageValidate = true;
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
					quantity,
					img:product.product_imgs[0].image,
					is_personalize:product.is_personalize,
					personalize_imgs:productPersonalizeImgs,
					personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
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
					quantity,
					img:product.product_imgs[0].image,
					is_personalize:product.is_personalize,
					personalize_imgs:productPersonalizeImgs,
					personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
 			setInputError(false);
 		}
 		else if(product.is_personalize_image && personalizeImageValidate){
 				vibrate();
 				dispatch(addToCart({
					id:product.id,
					title:product.title,
					price:product.price,
					detail:product.detail,
					quantity,
					img:product.product_imgs[0].image,
					is_personalize:product.is_personalize,
					personalize_imgs:productPersonalizeImgs,
					personalize_texts:productPersonalizeText
			 }));
			 notifySuccess('Item added to cart');
 			setInputError(false);
 		}
 		else{
 			console.log(personalizeTextValidate)
 			console.log(personalizeImageValidate)
 			setInputError(true);
 		}

 }
    useEffect(()=>{
      document.title=product_slug;
    	window.scrollTo(0,0);
    	toast.remove();
        fetchData(BASE_URL+'/product/'+product_id);
          if(user.isAuthenticate){
        			checkUserWishlist();
        }
      },[product_id,]);
 
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
						 <ProgressiveImage src={img.image} placeholder={yas} key={img.id}>
               {(src, loading) => (
                 <img
                    className={`img-fluid rounded mt-3 cursor-pointer${loading ? " loading" : " loaded"}`}
                		src={src}
                		alt="product image"
                		onClick={()=>{setSelectedImage(index)}}
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
					{/* for mobile view */}
					<div className="row mt-1 d-lg-none d-md-none">
					{	
						product.product_imgs?.map((img,index)=>{return(
						<div className="col-lg-3 col-md-3 col-sm-3 col-3" key={img.id}>
							<ProgressiveImage src={img.image} placeholder={yas}>
               {(src, loading) => (
                 <img
                    className={`img-fluid cursor-pointer${loading ? " loading" : " loaded"}`}
                		src={src}
                		alt="product image"
                		onClick={()=>{setSelectedImage(index)}}
                 />
                 )}
               </ProgressiveImage>
							{/* <img src={img.image} className="img-fluid cursor-pointer" onClick={()=>{setSelectedImage(index)}}/> */}
						</div>
						)})
					}
					</div>
				</div>
				<div className="col-lg-7 col-md-7 col-sm-12 col-12 pb-4">
				<small className="yas-text-secondary text-small">
							{
                (product.label===2)&& <span>Bestseller</span>
              }
              {
                (product.label===3)&& <span>Special Offer</span>
              }
              {
                (product.label===4)&& <span>Premium</span>
              }
              {
                (product.label===5)&& <span>Value Pack</span>
              }
              {
                (product.label===6)&& <span>Top Rated</span>
              }
				</small>
					<h4 className="text-dark">{product.title}</h4>
					<small className="text-secondary">{product.rating}</small><StarIcon style={{color:'#ffd400'}} fontSize=""/>
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
           	(product.available_quantity<4)&& <small className="text-small text-pink">Only {product.available_quantity} Items left in stock</small>
           	:""
           }
					 <p className="text-success fw-600">inclusive of all taxes</p>
					 {!product.is_stock && <small className="text-small text-pink">This product is currently out of stock.</small>}
					 {(product.is_personalize && product.is_stock) && <small className="text-small text-dark">This product need to be personalized before adding to the cart.</small>}													 
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
	                <button className="btn btn-white me-5 py-2" onClick={()=>{vibrate();removeFromWishlist(userWishlist.id)}}>
	               		<FavoriteIcon className="text-danger me-1"/>
									Wishlist
								 </button>
							 </div>
							 :
                <div>
	                <button className="btn btn-white me-5 py-2" onClick={()=>{vibrate();addToWishlist(product_id)}}>
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
												<button className="btn btn-pink text-uppercase fw-600" data-bs-toggle="modal" data-bs-target="#personalizeModal" >
													 <DriveFileRenameOutlineOutlinedIcon className="mb-1 me-1"/>personalize now
												</button>
												</>
												:
													<button className="btn btn-pink text-uppercase fw-600" onClick={()=>{vibrate();dispatch(addToCart({
													 		id:product.id,
															title:product.title,
															price:product.price,
															detail:product.detail,
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
							<div dangerouslySetInnerHTML={{__html:product.detail}}></div>
						</div>
						{
							product.product_info &&
						<div className="mt-3">
							<p className="fw-600 mb-1">Product Info</p>
							<div dangerouslySetInnerHTML={{__html:product.product_info}}></div>
						</div>

						}
						
							<div>
							<h5>Tags</h5>
								{!loading
								?
									productTags.map(tag=>{
										return(
													<Link to={`/products/${tag.title}`} className="badge bg-outline-pink ms-2 text-decoration-none text-capitalize" key={tag.id}>{tag.title}</Link>
											)
									})
								:
								<p className="text-danger">loading...</p>
								}
							
							</div>
				</div>

					
			</div>
			:
             <div className="text-center py-4">
                <div className="spinner-border text-danger"></div>
              </div>
			}
			{/* Personalize modal */}
                         <div className="modal " id="personalizeModal">
                            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                              <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <p className="modal-title fw-600">{product.title}</p>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body pt-0">
	                                <div className="sticky-top bg-white py-1">
		                                <div className="d-flex justify-content-between">
		                                	<p className="fw-600">Start Personalizing</p>
		                                	<Link to= "" className="text-decoration-none fw-bold text-danger" onClick={()=>{setProductPersonalizeText([]);setProductPersonalizeImgs([])}}>
		                                	<RestoreOutlinedIcon fontSize="small" className="mb-1"/> Reset All
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
			                                						<img src={item.image} className="img-fluid w-75"/>
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
	                                            			:<div className="text-center mt-2">
																			                <div className="spinner-border text-danger"></div>
																			                <div className="text-small">Uploading...</div>
																			              </div>
	                                            		}
			                                					</div>
			                                					<div className="text-center">
				                                          <Button variant="outlined" color="error" className="py-2 my-3 rounded-15 w-75" component="label">
						                                      	{
				                                            	productPersonalizeImgs.find(obj=>obj.id===item.id)
				                                            	?<span className="text-small fw-bold"><InsertPhotoOutlinedIcon fontSize="small"/> Change image {i+1}</span>
				                                            	:<span className="text-small fw-bold"><InsertPhotoOutlinedIcon fontSize="small"/> Upload image {i+1}</span>
	                                            		}
						                                          <input hidden accept="image/*" type="file" 
						                                          onChange={(e)=>{e.target.files[0]&&uploadImage({id:item.id,image:e.target.files[0],sample_image_url:item.image,isPersonalized:false})}}/>
				                                         	</Button>
		                                         		</div>

			                                					<div className="">
			                                					<ul className="text-secondary">
								                                	<li><span className="text-small text-secondary">Please upload good quality image.</span></li>
								                                	<li><span className="text-small text-secondary">Please ensure you have rights to use the image.</span></li>
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
					                              				<img src={item.image} className="img-fluid w-75"/>
					                              				 {
	                                            			productPersonalizeText.map((obj,textIndex)=>{
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
	                                            					}
	                                            			}
	                                            		})
	                                            	}
					                              				<div className="my-3">
						                              				<div className="text-small text-secondary my-3">
						                              					<small>Text {i+1} (Upto {item.text_length} characters)</small>
						                              				</div>
												                      		     <TextField
														                      		    color="error"
							                                          	onChange={(e)=>{productPersonalizeTextHandler({id:item.id,image:null,text:e.target.value,sample_image_url:item.image,isPersonalized:false})}}
														                      		    name={`text${i+1}`}
														                      		    fullWidth
														                      		    label={`Enter text ${i+1}`}
														                      		    inputProps={{ maxLength: item.text_length }}
												                      		   />
												                      		   <div className="text-end mt-2">
												                      		   	<Button variant="outlined" className="text-small" onClick={()=>{applyTextPersonalization(item.id)}}>Save</Button>
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
	            		                   	<div className="text-small text-pink mb-3 fw-bold">This product need to be personalized before adding to the cart.</div>
			                           	 }
			                           	 {
			                           	 	cartData.find((item)=>item.id==product_id)
										 								?
		                                	<Link to="/checkout" className="btn btn-pink text-uppercase py-2 w-100" >
		                                	 <span data-bs-dismiss="modal"><ShoppingCartOutlinedIcon />Go to cart</span>
																			</Link>
			                           	 :
	                                		<button className="btn btn-pink text-uppercase w-100 py-2" onClick={validate}>
			                           	 			submit
			                           	 		</button>
			                           	 }
	                                </div>
                                </div>

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                </div>
                              </div>
                            </div>
                          </div>
		</div>
		)
}
export default ProductDetail;