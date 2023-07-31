
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
import wedding from '../../images/uniquegift/wedding.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import required modules
import './UniqueGift.css'
const UniqueGift = () => {

	return (
	<div className="mt">
			<div className="d-flex justify-content-center">
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
	        <SwiperSlide>
	        			<img src={birthdaygift} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">birthday gifts</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        		<img src={rakhi} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">rakhi </p>
	        </SwiperSlide>
	        <SwiperSlide>
	        		<img src={fashion} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">fashion & lifestyle</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={gourmet} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">gourmet</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={jewellery} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">jewellery</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={homeliving} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">home & living</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={anniversary} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">anniversary gifts</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={mangocake} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">mango cakes</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={marvel} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">marvel collection</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={disney} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">disney collection</p>
	        </SwiperSlide>
	        <SwiperSlide>
	        			<img src={wedding} className="img-fluid"/>
               <p className="ms-4 text-capitalize header-menu-text mt-2">wedding gifts</p>
	        </SwiperSlide>

	     
      </Swiper>
	</div>
		)
}


export default UniqueGift;