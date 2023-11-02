import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import './PremiumGift.css'
import 'swiper/css/free-mode';

const PremiumGift = () => {
    const BASE_URL = 'https://simplykamar.tech/api';
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const [loading,setLoading] = useState(false);
    const [premiumGift,setPremiumGift] = useState([]);
    const notifyError = (msg) => toast.error(msg);

 function fetchPremiumGiftData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            // console.log(response);
            setPremiumGift(response.data);
            setLoading(false);
        })
        .catch(error=>{
            notifyError('Server error..!');
            // console.log(error);
            setLoading(false);
        })
    }  
   useEffect(()=>{
      fetchPremiumGiftData(BASE_URL+'/premium-gift-items')
  },[])
	return (
    <>
    <div><Toaster/></div>
    {
      !loading?
	<div className="">
			<div className="d-flex justify-content-center uniquegift-container">
				<div className="">
				<h2 className="text-capitalize text-heading">Premium gifts</h2>
				<p className="text-secondary" style={{fontSize:'14px'}}>Curated to make every special moment a celebration</p>
			</div>
			</div>
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
              slidesPerView:3,
              spaceBetween:10,
            },
            480:{
              slidesPerView:3,
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
          premiumGift.map((item)=>{
            return(
              <SwiperSlide key={item.id}>
                <Link to={`/product/${item.product.title}/${item.product.id}`}  className="text-decoration-none text-dark">
                    <img src={item.product.product_imgs[0].image} className="img-fluid"/>
                   <p className="text-center text-capitalize header-menu-text m-0 mt-1">{item.product.title.slice(0,25)}</p>
                </Link>
              </SwiperSlide>
              )
          })
        }
      </Swiper>
      
	</div>
  :
  <div>
    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <div className="d-flex justify-content-between">
      <Skeleton variant="rectangular" height={80} width={80} />
      <Skeleton variant="rectangular" height={80} width={80} />
      <Skeleton variant="rectangular" height={80} width={80} />
      </div>
  </div>
  }
  </>
		)
}


export default PremiumGift;