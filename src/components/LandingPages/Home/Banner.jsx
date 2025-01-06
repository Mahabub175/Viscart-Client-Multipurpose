"use client";

import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const swiperRef = useRef();

  const { data: sliders } = useGetAllSlidersQuery();

  const activeSliders = sliders?.results?.filter(
    (item) => item.status === "Active"
  );

  return (
    <section className="relative lg:container mx-auto xl:px-5">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        className="max-h-[600px] relative"
      >
        {activeSliders?.map((item) => {
          return (
            <SwiperSlide key={item?._id}>
              <Link href={`/products?filter=${item?.category?.name}`}>
                <div className="relative">
                  <div className="relative w-full h-[200px] lg:h-fit">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item.name}
                      width={2500}
                      height={700}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#e3e6e6] after:via-[#e3e6e6]/0 after:to-transparent"></div>
                  </div>
                  <div className="absolute z-10 top-20 lg:top-[45%] left-[5%] text-white">
                    {item?.name && (
                      <h2 className="text-primary text-3xl lg:text-7xl font-bold mb-2 lg:mb-6">
                        {item?.name}
                      </h2>
                    )}
                    {item?.buttonText && (
                      <button className="bg-primary px-5 py-2 lg:px-10 lg:py-4 lg:text-xl font-bold text-white rounded-xl">
                        {item?.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        <div className="flex items-center justify-between gap-5 mt-10">
          <button
            className="z-10 absolute top-[35%] lg:top-[45%] left-5 lg:left-10"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <MdOutlineArrowBackIosNew className="text-4xl" />
          </button>
          <button
            className="z-10 absolute top-[35%] lg:top-[45%] right-5 lg:right-10"
            onClick={() => swiperRef.current.slideNext()}
          >
            <MdOutlineArrowBackIosNew className="text-4xl rotate-180" />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
