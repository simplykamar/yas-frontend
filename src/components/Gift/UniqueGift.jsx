import uniquegift from '../../images/uniquegift/uniquegift.svg'
import birthdaygift from '../../images/uniquegift/birthdaygift.webp'
import disney from '../../images/uniquegift/disney.webp'
import fashion from '../../images/uniquegift/fashion.jpg'
import gourmet from '../../images/uniquegift/gourmet.webp'
import jewellery from '../../images/uniquegift/jewellery.webp'
import homeliving from '../../images/uniquegift/homeliving.webp'
import anniversary from '../../images/uniquegift/anniversary.jpg'
import mangocake from '../../images/uniquegift/mangocake.webp'
import marvel from '../../images/uniquegift/marvel.webp'
import rakhi from '../../images/uniquegift/rakhi.webp'
import {Link} from 'react-router-dom';
import wedding from '../../images/uniquegift/wedding.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import './UniqueGift.css'
import {  Pagination } from 'swiper/modules';


const UniqueGift = () => {

	return (
	<div className="">
			<div className="d-flex justify-content-center uniquegift-container">
				<img src={uniquegift} className="img-fluid uniquegift"/>
				<div className="mt-5">
				<h2 className="text-capitalize">unique gifts online</h2>
				<p>Curated to make every special moment a celebration</p>
			</div>
			</div>
		<Swiper
          slidesPerView={6}
	        centeredSlides={false}
					spaceBetween={-200}
	        className="mySwiper pe-5"
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
	        <SwiperSlide className="">
            <Link to="/category/cake/11" className="text-decoration-none text-dark">
	        			<img src={birthdaygift} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">birthday gifts</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/rakhi/8" className="text-decoration-none text-dark">
	        		<img src={rakhi} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">rakhi </p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/fashion & lifestyle/22" className="text-decoration-none text-dark">
	        		<img src={fashion} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">fashion & lifestyle</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/gourmet/21" className="text-decoration-none text-dark">
	        			<img src={gourmet} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">gourmet</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/jewellery/20" className="text-decoration-none text-dark">
	        			<img src={jewellery} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">jewellery</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/home & living/23" className="text-decoration-none text-dark">
	        			<img src={homeliving} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">home & living</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/anniversary/17" className="text-decoration-none text-dark">
	        			<img src={anniversary} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">anniversary gifts</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/mango cake/24" className="text-decoration-none text-dark">
	        			<img src={mangocake} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">mango cakes</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/marvel collection/18" className="text-decoration-none text-dark">
	        			<img src={marvel} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">marvel collection</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/disney collection/19" className="text-decoration-none text-dark">
	        			<img src={disney} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">disney collection</p>
            </Link>
	        </SwiperSlide>
	        <SwiperSlide>
            <Link to="/category/wedding/16" className="text-decoration-none text-dark">
	        			<img src={wedding} className="img-fluid"/>
               <p className="text-center text-capitalize header-menu-text m-0 mt-1">wedding gifts</p>
            </Link>
	        </SwiperSlide>

	     
      </Swiper>
	</div>
		)
}


export default UniqueGift;