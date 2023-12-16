import './Slider.css'
import Skeleton from '@mui/material/Skeleton';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/free-mode';

const Slider = () => {
    const BASE_URL = 'https://simplykamar.tech/api';
    // const BASE_URL = 'http://127.0.0.1:8000/api';
    const [homeBanner,setHomeBanner] = useState([]);
    const [loading,setLoading] = useState(false);
    const notifyError = (msg) => toast.error(msg);

    function fetchHomeBannerData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            // console.log(response);
            setHomeBanner(response.data)
            setLoading(false);
        })
        .catch(error=>{
            notifyError('Server error..!');
            // console.log(error);
            setLoading(false);
        })
    }
   useEffect(()=>{
      fetchHomeBannerData(BASE_URL+'/home-banner-items')
  },[])
	return (
	<div className="mt-2">
        <div><Toaster/></div>
        {
            !loading
            ?
            <Swiper
          // slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            // navigation={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Autoplay]}
            className="mySwiper"
            loop={true}
          >
                   {
                    homeBanner.map(item=>{
                        return(
                                <SwiperSlide key={item.id}>
                                    <Link to={`/category/${item.category.title}/${item.category.id}`}>
                                       <img src={item.image} className="img-fluid home-slider-img"/>
                                    </Link>
                                </SwiperSlide>
                            )
                    })
                }        
      </Swiper>
             : 
                <Skeleton variant="rounded" height={120} />
            }
		
	</div>
		)
}


export default Slider;