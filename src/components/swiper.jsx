import {Swiper, SwiperSlide} from "swiper/react"
// import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import {Navigation, Pagination, Autoplay, EffectCoverflow, EffectCards, Scrollbar, Thumbs, Controller, A11y } from "swiper/modules"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/bundle"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-cards"


const SWIPER = ({bodyPage,setting}) => {

    return (
        <>
        <Swiper
          modules={[Navigation, Pagination, EffectCards, EffectCoverflow, Autoplay, Scrollbar, A11y, Thumbs, Controller]}
        //   thumbs={{ swiper: thumbsSwiper }}
        //   controller={{ control: secondSwiper }}
        direction={setting.hasOwnProperty("default") ? "horizontal" : "vertical"}
          effect={setting.hasOwnProperty("default") ? "coverflow" : "cards"} 
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={5}
          navigation={true}
          autoplay={{delay:7000, disableOnInteraction:true}}
          loop={true}
          slidesPerView={1}
          cardsEffect={
            {
              rotate:20,
              stretch:0,
              depth:100,
              modifier:1,
              slideShadows:false
            }
          }
          pagination={{clickable:true}}
          scrollbar={{draggable:true}}
        
        >
            {
                bodyPage.map((main,index) => (
                    <SwiperSlide key={index} virtual={index}>
                        {main}
                    </SwiperSlide>
                ))
            }
        </Swiper>
            </>
    )

}

export default SWIPER