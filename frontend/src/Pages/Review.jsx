import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Jenny Wilson",
    testimony: "Absolutely love the collection!",
  },
  {
    name: "Dianne Russell",
    testimony: "Great styles, super comfortable.",
  },
  {
    name: "Cameron Williamson",
    testimony: "Fast delivery and stylish products.",
  },
  {
    name: "Sarah Smith",
    testimony: "Excellent customer support and trendy designs!",
  },
  {
    name: "John Doe",
    testimony: "Will definitely order again!",
  },
  {
    name: "Priya Verma",
    testimony: "Feels premium and looks amazing!",
  },
];

const Reviews = () => {
  return (
    <div className="my-12 w-full">
      <h2 className="text-2xl md:text-4xl font-body font-semibold text-center my-6">
        Hear What Our Customers Say
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        loop={true}
        centeredSlides={true}
        modules={[Navigation]}
        className="w-full md:w-3/4 mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <img
              src={`https://xsgames.co/randomusers/assets/avatars/female/${index}.jpg`}
              alt={item.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h5 className="text-lg font-medium font-body">{item.name}</h5>
            <p className="mt-2 text-sm text-gray-600 font-serif">{item.testimony}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
 