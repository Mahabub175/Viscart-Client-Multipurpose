"use client";

import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar"; // Import the Swiper Scrollbar styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { useRef } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import LinkButton from "@/components/Shared/LinkButton";

const NewArrivalProducts = () => {
  const swiperRef = useRef();

  const { data: productData } = useGetAllProductsQuery();

  const activeProducts = productData?.results
    ?.filter((item) => item?.status !== "Inactive")
    ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

  return (
    <section className="container mx-auto px-2 lg:px-10 mt-10">
      <div className=" bg-white p-5">
        <h2 className="text-2xl font-medium mb-2">New Arrivals</h2>

        {activeProducts?.length > 0 ? (
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={6}
              slidesPerGroup={3}
              spaceBetween={10}
              navigation
              scrollbar={{ draggable: true }}
              className="mySwiper relative"
            >
              {activeProducts?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <LinkButton href={`/products/${product?.slug}`}>
                    <Image
                      src={formatImagePath(product?.mainImage)}
                      alt={product?.name ?? "Product Image"}
                      width={260}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </LinkButton>
                </SwiperSlide>
              ))}
              <div className="flex items-center justify-between gap-5 mt-10">
                <button
                  className="z-10 absolute top-[35%] lg:top-[25%] left-0 lg:left-0 bg-white py-10 px-2"
                  onClick={() => swiperRef.current.slidePrev()}
                >
                  <MdOutlineArrowBackIosNew className="text-4xl" />
                </button>
                <button
                  className="z-10 absolute top-[35%] lg:top-[25%] right-0 lg:right-0 bg-white py-10 px-2"
                  onClick={() => swiperRef.current.slideNext()}
                >
                  <MdOutlineArrowBackIosNew className="text-4xl rotate-180" />
                </button>
              </div>
            </Swiper>
          </div>
        ) : (
          <div className="text-center text-xl font-semibold my-10">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivalProducts;
