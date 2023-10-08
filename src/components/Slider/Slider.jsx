import './Slider.css'
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/free-mode';

const Slider = () => {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const [homeBanner,setHomeBanner] = useState([]);
    const [loading,setLoading] = useState(false);

    function fetchHomeBannerData(url){
        setLoading(true);
        axios.get(url)
        .then(response=>{
            console.log(response);
            setHomeBanner(response.data)
            setLoading(false);
        })
        .catch(error=>{
            alert('Server error..!');
            console.log(error);
            setLoading(false);
        })
    }
   useEffect(()=>{
      fetchHomeBannerData(BASE_URL+'/home-banner-items')
  },[])
	return (
	<div className="mt-4">
		<Swiper
	        spaceBetween={30}
	        centeredSlides={true}
	        autoplay={{
	          delay: 2000,
	          disableOnInteraction: false,
	        }}
	        // pagination={{
	        //   clickable: true,
	        // }}
	        // navigation={true}
	        modules={[Autoplay, Navigation]}
	        className="mySwiper"
	      >
	       {
                !loading
                ?
                    homeBanner.map(item=>{
                        return(
                                <SwiperSlide key={item.id}>
	                                <Link to={`/category/${item.category.title}/${item.category.id}`}>
	                             	   <img src={item.image} className="img-fluid home-slider-img"/>
	                                </Link>
                                </SwiperSlide>
                            )
                    })
                :
                 <div className="text-center">
                    <div className="spinner-border text-danger"></div>
                  </div>
            }
	     
      </Swiper>
	</div>
		)
}


export default Slider;