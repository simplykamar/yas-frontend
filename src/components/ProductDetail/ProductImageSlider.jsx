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
import 'swiper/css/effect-cube';
import './ProductImageSlider.css';

// import required modules
import { EffectCube,Zoom,FreeMode,  Thumbs } from 'swiper/modules';

function ProductImageSlider({ productImgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(productImgs)
  return (
    <div className='product-image-swiper'>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        zoom={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[EffectCube,Zoom,FreeMode, Thumbs]}
        className="product-image-swiper-2"
        loop={true}
      >
        { 
            productImgs.map((img,index)=>{return(
              <SwiperSlide key={index+1}>
              <ProgressiveImage src={img.image} placeholder={yas}>
               {(src, loading) => (
                 <img
                    className={`img-fluid cursor-pointer${loading ? " loading" : " loaded"}`}
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
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
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
                    className={`img-fluid cursor-pointer${loading ? " loading" : " loaded"}`}
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
  );
}

export default ProductImageSlider;