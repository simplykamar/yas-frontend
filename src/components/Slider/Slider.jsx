import birthday from '../../images/slider/birthday.webp'
import cake from '../../images/slider/cake.webp'
import flower from '../../images/slider/flower.webp'
import gift from '../../images/slider/gift.webp'
import rakhi from '../../images/slider/rakhi.webp'
import rakhi2 from '../../images/slider/rakhi2.jpg'
import happiness from '../../images/slider/happiness.jpg'
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './Slider.css'
import 'swiper/css/free-mode';

const Slider = () => {

	return (
	<div className="mt-5">
		<Swiper
	        spaceBetween={30}
	        centeredSlides={true}
	        autoplay={{
	          delay: 2500,
	          disableOnInteraction: false,
	        }}
	        pagination={{
	          clickable: true,
	        }}
	        // navigation={true}
	        modules={[Autoplay, Pagination, Navigation]}
	        className="mySwiper"
	      >
	        <SwiperSlide><Link to="/category/rakhi/8"><img src={rakhi} className="img-fluid home-slider-img"/></Link></SwiperSlide>
	        <SwiperSlide><Link to="/category/rakhi/8"><img src={rakhi2} className="img-fluid home-slider-img"/></Link></SwiperSlide>
	        {/* <SwiperSlide><Link to="/category/cake/9"><img src={birthday} className="img-fluid home-slider-img"/></Link></SwiperSlide> */}
	        {/* <SwiperSlide><Link to="/category/cake/9"><img src={cake} className="img-fluid home-slider-img"/></Link></SwiperSlide> */}
	        <SwiperSlide><Link to="/category/personalized/12"><img src={gift} className="img-fluid home-slider-img"/></Link></SwiperSlide>
	        <SwiperSlide><Link to="/category/flowers/11"><img src={flower} className="img-fluid home-slider-img"/></Link></SwiperSlide>
	        <SwiperSlide><Link to="/category/cake/9"><img src={happiness} className="img-fluid home-slider-img"/></Link></SwiperSlide>
	     
      </Swiper>
	</div>
		)
}


export default Slider;