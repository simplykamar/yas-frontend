import ProductsSkeleton from '../LoadingSkeleton/ProductsSkeleton';
import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';
import {useSelector} from 'react-redux'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import './Slider.css'
import 'swiper/css/free-mode';


const RecentlyViewed = ({productId}) => {
  	const BASE_URL = 'http://127.0.0.1:8000/api';
  	const [products,setProducts] = useState([])
  	const [loading,setLoading] = useState(true)
  	const user = useSelector((state)=>state.auth);

	function getProductViewed(){
		axios.get(BASE_URL+`/get-recently-view-product?customer=${user.user.id}`,{headers:{"Authorization" : `JWT ${user.access}`}})
		.then(response=>{
			console.log(response)
			setProducts(response.data)
			setLoading(false)
			setProductViewed();
		})
		.catch(error=>{
			console.log(error)
			setLoading(false)
		})
	}
	function setProductViewed(){
		const formData = new FormData();
		formData.append('customer',user.user.id);
		formData.append('product',productId);
		axios.post(BASE_URL+'/get-recently-view-product/',formData,{headers:{"Authorization" : `JWT ${user.access}`}})
		.then(response=>{
			console.log(response)
			setLoading(false)
		})
		.catch(error=>{
			console.log(error)
			setLoading(false)
		})
	}
	useEffect(()=>{
		if(user.isAuthenticate){
			getProductViewed();
		}
	},[productId,])
	return(
		<div>
		{
			!loading
				?
				<div className="my-4">
				<h2 className="mb-4 text-center">Recently Viewed Products</h2>
				<Swiper
		          slidesPerView={6}
			        centeredSlides={false}
							spaceBetween={-200}
							pagination={{
			          clickable: true,
			        }}
			        modules={[Pagination, Navigation]}
			        className="mySwiper"
			         breakpoints={{
		            0:{
		              slidesPerView:2,
		              spaceBetween:10,
		            },
		            480:{
		              slidesPerView:2,
		              spaceBetween:10,
		            },
		            768:{
		              slidesPerView:4,
		              spaceBetween:10,
		            },
		            1024:{
		              slidesPerView:6,
		              spaceBetween:10,
		            },
		            1280:{
		              slidesPerView:6,
		              spaceBetween:10,
		            },
		          }}
			      >
			      {
			      	products.map(item=>{
			      		return(
						        <SwiperSlide className="" key={item.product.id}>
		                          <SingleProduct
		                           isPersonalize={item.product.is_personalize} 
		                           rating={item.product.rating} 
		                           id={item.product.id} 
		                           image={item.product.product_imgs[0].image} 
		                           title={item.product.title} 
		                           oldPrice={item.product.old_price} 
		                           label={item.product.label} 
		                           price={item.product.price} 
		                           discount={item.product.discount} />
						        </SwiperSlide>
			      			)
			      	})
			      }
			          </Swiper>
					</div>
			:
             <ProductsSkeleton count={4}/>
			}
		</div>
		)
}


export default RecentlyViewed
