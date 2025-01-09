/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProductCountCart from "@/components/LandingPages/Home/Products/ProductCountCart";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import {
  useGetAllProductsQuery,
  useGetSingleProductBySlugQuery,
} from "@/redux/services/product/productApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { Rate } from "antd";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaPlay, FaWhatsapp } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import ProductCard from "../Home/Products/ProductCard";
import AttributeOptionSelector from "@/components/Shared/Product/AttributeOptionSelector";

const SingleProductDetails = ({ params }) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  const { data: singleProduct } = useGetSingleProductBySlugQuery(
    params?.productId
  );

  const businessWhatsapp = globalData?.results?.businessWhatsapp;

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${businessWhatsapp}`, "_blank");
  };

  const { data: productData } = useGetAllProductsQuery();

  const activeProducts = productData?.results
    ?.filter(
      (item) =>
        item?.status !== "Inactive" &&
        item?.name !== singleProduct?.name &&
        item?.category?.name === singleProduct?.category?.name
    )
    ?.slice(0, 8);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [currentVariant, setCurrentVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [variantMedia, setVariantMedia] = useState([]);

  const groupedAttributes = singleProduct?.variants?.reduce((acc, variant) => {
    variant.attributeCombination.forEach((attribute) => {
      const attributeName = attribute.attribute.name;
      if (!acc[attributeName]) {
        acc[attributeName] = [];
      }
      if (!acc[attributeName].some((opt) => opt.name === attribute.name)) {
        acc[attributeName].push({
          name: attribute.name,
          label: attribute.label || attribute.name,
          _id: attribute._id,
        });
      }
    });
    return acc;
  }, {});

  const handleAttributeSelect = (attributeName, option) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: option,
    }));
  };

  useEffect(() => {
    if (Object.keys(selectedAttributes).length === 0) {
      setCurrentVariant(null);
      setVariantMedia([]);
    } else {
      const updatedVariant = singleProduct?.variants.find((variant) =>
        Object.entries(selectedAttributes).every(
          ([attrName, selectedValue]) => {
            return variant.attributeCombination.some(
              (attr) =>
                attr.attribute.name === attrName && attr.name === selectedValue
            );
          }
        )
      );
      setCurrentVariant(updatedVariant);

      if (updatedVariant?.images) {
        setVariantMedia(
          updatedVariant.images.map((image) => formatImagePath(image))
        );
      } else {
        setVariantMedia([]);
      }
    }
  }, [selectedAttributes, singleProduct]);

  const currentPrice = currentVariant
    ? currentVariant?.sellingPrice
    : singleProduct?.offerPrice ?? singleProduct?.sellingPrice;

  const currentImage = selectedImage
    ? selectedImage
    : currentVariant?.images && currentVariant.images.length > 0
    ? formatImagePath(currentVariant.images[0])
    : formatImagePath(singleProduct?.mainImage);

  const allMedia =
    variantMedia.length > 0
      ? [
          ...variantMedia,
          singleProduct?.video ? "video-thumbnail" : null,
        ].filter(Boolean)
      : [
          singleProduct?.mainImage
            ? formatImagePath(singleProduct.mainImage)
            : null,
          ...(Array.isArray(singleProduct?.images)
            ? singleProduct.images.map((image) =>
                image ? formatImagePath(image) : null
              )
            : []),
          ...(Array.isArray(singleProduct?.variants)
            ? singleProduct.variants.flatMap((variant) =>
                Array.isArray(variant.images)
                  ? variant.images.map((image) =>
                      image ? formatImagePath(image) : null
                    )
                  : []
              )
            : []),
          singleProduct?.video ? "video-thumbnail" : null,
        ].filter(Boolean);

  const handleMediaClick = (media) => {
    if (media === "video-thumbnail") {
      setIsVideoPlaying(true);
      setSelectedImage(null);
      setVariantMedia([]);
    } else {
      setIsVideoPlaying(false);
      setSelectedImage(media);
    }
  };

  const [isMagnifying, setIsMagnifying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsMagnifying(true);
  };

  const handleMouseLeave = () => {
    setIsMagnifying(false);
  };
  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    };
  };

  const handleMouseMove = useCallback(
    throttle((e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setMousePosition({ x, y });
    }, 50),
    []
  );

  const magnifierSize = 100;
  const zoomLevel = 2;

  return (
    <section className="container mx-auto px-2 lg:px-5 py-10">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 mb-10">
        <div className="mx-auto flex flex-col lg:flex-row-reverse items-center lg:gap-5">
          <div className="relative mx-auto lg:w-[300px] xl:w-full">
            {isVideoPlaying && singleProduct?.video ? (
              <video
                src={formatImagePath(singleProduct?.video)}
                controls
                autoPlay
                className="mx-auto rounded-xl w-full h-auto"
              >
                Your browser does not support the video tag.
              </video>
            ) : currentImage ? (
              <>
                <div className="hidden lg:block">
                  <div className="relative">
                    <Image
                      src={currentImage}
                      alt={singleProduct?.name}
                      width={450}
                      height={450}
                      className="object-cover"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    />
                  </div>

                  {isMagnifying && (
                    <div
                      className="absolute top-0 left-0"
                      style={{
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        left: `${mousePosition.x - magnifierSize / 2}px`,
                        top: `${mousePosition.y - magnifierSize / 2}px`,

                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      <div
                        className="absolute w-full h-full"
                        style={{
                          backgroundImage: `url(${currentImage})`,
                          backgroundSize: `${zoomLevel * 100}%`,
                          backgroundPosition: `-${
                            mousePosition.x * zoomLevel - magnifierSize / 2
                          }px -${
                            mousePosition.y * zoomLevel - magnifierSize / 2
                          }px`,
                          width: `${zoomLevel * 200}%`,
                          height: `${zoomLevel * 200}%`,
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="lg:hidden">
                  <Zoom>
                    <Image
                      src={currentImage}
                      alt="product image"
                      height={450}
                      width={450}
                      className="mx-auto rounded-xl"
                    />
                  </Zoom>
                </div>
              </>
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div className="flex flex-row lg:flex-col justify-start gap-2 mt-5 max-h-[400px] w-[300px] lg:w-auto xl:w-[152px] border rounded-xl p-4 !overflow-x-auto lg:overflow-y-auto thumbnail">
            {allMedia?.map((media, index) => (
              <div
                key={index}
                onClick={() => handleMediaClick(media)}
                className={`cursor-pointer border-2 rounded-xl ${
                  selectedImage === media ||
                  (media === "video-thumbnail" && isVideoPlaying)
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {media === "video-thumbnail" ? (
                  <div className="flex items-center justify-center rounded-xl w-20 h-20">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-xl w-20 h-20">
                      <Image
                        src={media}
                        alt={`media ${index}`}
                        height={80}
                        width={80}
                        className="object-cover rounded-xl"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col text-sm lg:text-base lg:w-1/2 -mt-8 lg:-mt-0">
          <h2 className="text-xl md:text-3xl font-medium mb-2">
            {singleProduct?.name}
          </h2>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Category:</span>
            <span>{singleProduct?.category?.name}</span>
          </div>
          {singleProduct?.brand && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Brand:</span>
              <span>{singleProduct?.brand?.name}</span>
            </div>
          )}
          <div className="flex items-center mt-4 gap-4 font-medium">
            <Rate disabled value={singleProduct?.ratings?.average} allowHalf />(
            {singleProduct?.ratings?.count})
          </div>
          <div className="flex items-center gap-4 text-textColor font-medium my-2">
            Price:{" "}
            {singleProduct?.offerPrice ? (
              <p className="text-primary text-xl">
                {globalData?.results?.currency +
                  " " +
                  singleProduct?.offerPrice}
              </p>
            ) : (
              <p className="text-primary text-xl">
                {globalData?.results?.currency + " " + currentPrice}
              </p>
            )}
            {singleProduct?.offerPrice && (
              <p className="text-base line-through text-red-500">
                {globalData?.results?.currency +
                  " " +
                  singleProduct?.sellingPrice}
              </p>
            )}
          </div>
          <hr />
          <AttributeOptionSelector
            groupedAttributes={groupedAttributes}
            selectedAttributes={selectedAttributes}
            handleAttributeSelect={handleAttributeSelect}
            item={singleProduct}
          />
          <hr />

          <div
            dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
            className="mt-5"
          ></div>
          <div
            className="w-full bg-primary px-10 py-2 text-xs lg:text-sm rounded-full shadow-xl mt-10 text-center text-white font-bold cursor-pointer"
            onClick={handleWhatsappClick}
          >
            <p>Click To Place a Order With Just a Phone Call</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <FaWhatsapp className="text-2xl" />
              <p>{businessWhatsapp}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-5 border border-gray-300 rounded-xl p-5">
          <div className="flex items-center gap-4 text-textColor font-medium my-2">
            Price:{" "}
            {singleProduct?.offerPrice ? (
              <p className="text-primary text-xl">
                {globalData?.results?.currency +
                  " " +
                  singleProduct?.offerPrice}
              </p>
            ) : (
              <p className="text-primary text-xl">
                {globalData?.results?.currency + " " + currentPrice}
              </p>
            )}
            {singleProduct?.offerPrice && (
              <p className="text-base line-through text-red-500">
                {globalData?.results?.currency +
                  " " +
                  singleProduct?.sellingPrice}
              </p>
            )}
          </div>
          <div className="my-5">
            {!singleProduct?.stock > 0 ? (
              <div className="text-lg text-red-500">(Out Of Stock)</div>
            ) : (
              <div className="text-lg text-green-500">(In Stock)</div>
            )}
          </div>
          <ProductCountCart
            item={singleProduct}
            previousSelectedVariant={currentVariant}
            setPreviousSelectedVariant={setCurrentVariant}
            fullWidth
            selectedPreviousAttributes={selectedAttributes}
            currentPrice={currentPrice}
          />
        </div>
      </div>

      <div className="mt-20">
        {activeProducts && activeProducts.length > 0 ? (
          <>
            <h2 className="text-xl lg:text-3xl font-bold mb-5 border-b pb-2 px-2">
              Products related to this item
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-5 lg:gap-5">
              {activeProducts.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default SingleProductDetails;
