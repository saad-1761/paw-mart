import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Banner_1 from "../assets/Banner-1.jpg";
import Banner_2 from "../assets/Banner-2.jpg";
import Banner_3 from "../assets/Banner-3.jpg";

export default function BannerCarousel() {
  const images = [Banner_1, Banner_2, Banner_3];

  return (
    <div className="relative -z-10 w-full  mx-auto h-64 md:h-112  overflow-hidden rounded-2xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        //pagination={{ clickable: false }}
        //navigation={true}
        className="h-full"
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 md:left-10 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg leading-tight">
                Paw Mart: Find Your Furry Friend Today!
              </h2>
              <p className="text-base font-medium sm:text-lg md:text-2xl lg:text-3xl mt-2">
                Because Every Pet Deserves Love and Care.
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
