"use client";

import LinkButton from "@/components/Shared/LinkButton";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import { setFilter } from "@/redux/services/device/deviceSlice";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import "swiper/css";

const FourthSectionCategories = () => {
  const dispatch = useDispatch();

  const { data: categories } = useGetAllCategoriesQuery();
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const activeCategories = categories?.results?.filter(
    (item) => item?.status !== "Inactive"
  );

  const itemClickHandler = (item) => {
    if (item?.name) {
      dispatch(setFilter(item?.name));
    }
  };

  return (
    <>
      <section className="container mx-auto px-2 lg:px-10 mt-10 z-10 relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {globalData?.results?.sectionFourCategories?.categories?.length > 0 &&
          globalData?.results?.sectionFourCategories?.categories?.map(
            (globalItem, index) => {
              const matchingCategories = activeCategories?.filter(
                (item) =>
                  item?.parentCategory?.name?.toLowerCase() ===
                  globalItem?.name?.toLowerCase()
              );

              const showSingleImage =
                !globalData?.results?.sectionFourCategories?.multiple &&
                index === 3;

              return (
                <div className="bg-white p-5" key={globalItem?._id}>
                  {showSingleImage ? (
                    <div className="relative">
                      <h2 className="text-md font-medium mb-2">
                        Top categories in {globalItem?.name}
                      </h2>
                      <div className="group" key={globalItem?._id}>
                        <LinkButton href={`/products`}>
                          <div
                            className="overflow-hidden w-full h-full mx-auto"
                            onClick={() => itemClickHandler(globalItem)}
                          >
                            <Image
                              src={
                                formatImagePath(globalItem?.attachment) ??
                                "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                              }
                              alt={globalItem?.name ?? "demo"}
                              width={700}
                              height={500}
                              className="w-full lg:h-[380px] mx-auto object-fill group-hover:scale-110 duration-500"
                            />
                          </div>
                        </LinkButton>
                      </div>
                      <Link href={`/products`}>
                        <span
                          className="lg:text-start text-blue-500 font-medium text-xs"
                          onClick={() => itemClickHandler(globalItem)}
                        >
                          Explore all products in {globalItem?.name}
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-md font-medium mb-2">
                        Top categories in {globalItem?.name}
                      </h2>
                      <div className="grid grid-cols-2 gap-5 mb-5">
                        {matchingCategories?.slice(0, 4)?.map((category) => (
                          <div className="group" key={category?._id}>
                            <LinkButton href={`/products`}>
                              <div
                                className="overflow-hidden w-full h-full mx-auto"
                                onClick={() => itemClickHandler(category)}
                              >
                                <Image
                                  src={
                                    category?.attachment ??
                                    "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                                  }
                                  alt={category?.name ?? "demo"}
                                  width={160}
                                  height={160}
                                  className="mx-auto object-fill group-hover:scale-110 duration-500"
                                />
                              </div>
                              <h2 className="mt-2 text-sm font-medium lg:text-start">
                                {category?.name}
                              </h2>
                            </LinkButton>
                          </div>
                        ))}
                      </div>
                      <Link href={`/products`}>
                        <span
                          className="lg:text-start text-blue-500 font-medium text-xs"
                          onClick={() => itemClickHandler(globalItem)}
                        >
                          Explore all products in {globalItem?.name}
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              );
            }
          )}
      </section>
    </>
  );
};

export default FourthSectionCategories;
