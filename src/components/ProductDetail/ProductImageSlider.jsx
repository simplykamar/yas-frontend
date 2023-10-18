import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ProgressiveImage from "react-progressive-graceful-image";
import yas from '../../images/other/yas.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import './ProductImageSlider.css';

// import required modules
import { Zoom,FreeMode,  Thumbs } from 'swiper/modules';

function ProductImageSlider({ productImgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='product-image-swiper'>
      <Swiper
        zoom={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom,FreeMode, Thumbs]}
        className="product-image-swiper-2"
        loop={true}
      >
        { 
            productImgs.map((img,index)=>{return(
              <SwiperSlide key={index+1}>
              <ProgressiveImage src={img.image} placeholder={yas}>
               {(src, loading) => (
                 <img
                    className={`img-fluid w-75 cursor-pointer${loading ? " loading" : " loaded"}`}
                    src={src}
                    alt="product image"
                    style={img.isPersonalized&&{border:'2px solid yellow'}}
                 />
                 )}
               </ProgressiveImage>
              </SwiperSlide>
            )})
          }
        
      </Swiper>
      <div className="px-4">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="product-image-swiper-1"
        loop={true}
      >
      { 
            productImgs?.map((img,index)=>{return(
              <SwiperSlide key={index+1}>
              <ProgressiveImage src={img.image} placeholder={yas}>
               {(src, loading) => (
                 <img
                    className={`img-fluid w-75 cursor-pointer${loading ? " loading" : " loaded"}`}
                    src={src}
                    alt="product image"
                    style={img.isPersonalized&&{border:'2px solid yellow'}}
                 />
                 )}
               </ProgressiveImage>
              </SwiperSlide>
            )})
          }
      </Swiper>
      </div>
    </div>
  );
}

export default ProductImageSlider;