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

const ProductDetail = () => {
  const BASE_URL = 'http://127.0.0.1:8000/api';
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

  const fetchData = async (baseurl) => {
      await fetch(baseurl)
              .then((response)=>response.json())
              .then((data)=>{
                console.log(data.tag_list)
                setProduct(data);
                setLoading(false);
                setProductTags(data.tag_list)
              });
    }
    function removeFromWishlist(id){
          if(user.isAuthenticate){
            axios.delete(BASE_URL+`/customer-wishlist/${id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
           .then(response=>{
             console.log(response);
            checkUserWishlist();

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
             console.log(response);
            checkUserWishlist();
           })
           .catch(error=>{console.log(error)})
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
                console.log(response.data)
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
        fetchData(BASE_URL+'/product/'+product_id);
          if(user.isAuthenticate){
        			checkUserWishlist();
        			console.log("isAuthenticate")
        }
          
           
      },[product_id,]);
    const tagLinks = []
   for (let i = 0; i<productTags.length; i++){
   		let tag = productTags[i].trim();
   		tagLinks.push(<Link to={`/products/${tag}`} className="badge bg-outline-pink ms-2 text-decoration-none text-capitalize" key={i}>{tag}</Link>)
   } 
	return(
		<div className="container-fluid pt-5">
		{ !loading
			?
			<div className="row">
				<div className="col-lg-4 col-md-4 col-sm-12 col-12">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-3 col-3">
							{ 
						product.product_imgs?.map((img,index)=>{return(
						<img src={img.image} key={img.id} className="img-fluid img-thumbnail mt-3 cursor-pointer" onClick={()=>{setSelectedImage(index)}}/>
						)})
					}
						</div>
						<div className="col-lg-9 col-md-9 col-sm-12 col-12">
								<img src={product.product_imgs[selectedImage].image} className="img-fluid img-thumbnail mt-3"/>							
						</div>
					</div>
				</div>
				<div className="col-lg-8 col-md-8 col-sm-12 col-12">
					<h4 className="text-dark">{product.title}</h4>
					{/* <p> {product.detail}</p> */}
					<p><small className="text-secondary">{product.rating}</small><StarIcon style={{color:'#ffd400'}} fontSize=""/> | 186 Rating</p>
					 <h5>₹{product.price}<span className="text-secondary ms-2" style={{fontSize:"16px"}}> </span></h5>
					 <p className="text-success fw-600">inclusive of all taxes</p>
					 	<div className="mt-4">
							 { 
							 <button className="btn btn-pink px-4 ms-2" onClick={()=>{dispatch(addToCart({
							 		id:product.id,
									title:product.title,
									price:product.price,
									detail:product.detail,
									quantity,
									img:product.product_imgs[0].image
							 }))}}> <ShoppingBagOutlinedIcon className="mb-1 me-2"/>Add Cart</button>
							 	}

							 
               {
               	!loading?
                userWishlist.is_wishlist
                ?
                <button className="btn btn-white px-4 ms-5 border" onClick={()=>{removeFromWishlist(userWishlist.id)}}>
               		<FavoriteIcon className="text-danger"/>
								Wishlist
							 </button>
							 :
                <button className="btn btn-white px-4 ms-5 border" onClick={()=>{addToWishlist(product_id)}}>
								<FavoriteBorderOutlinedIcon />
								Wishlist
							 </button>
							 :""
							}
							  
						</div>
						<p className="mt-4 text-secondary">{product.detail}</p>
						<h5>Tags</h5>
							{tagLinks}
				</div>
				
			</div>
			:
             <div className="text-center">
                <div className="spinner-border text-danger"></div>
              </div>
			}
		</div>
		)
}
export default ProductDetail;