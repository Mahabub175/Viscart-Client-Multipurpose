"use client";

import LinkButton from "@/components/Shared/LinkButton";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

const Categories = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  const activeCategories = categories?.results?.filter(
    (item) => item?.status !== "Inactive"
  );

  const activeHomeCategory = activeCategories?.filter(
    (item) => item?.parentCategory?.name?.toLowerCase() === "home essentials"
  );

  const activeGamingCategory = activeCategories?.filter(
    (item) => item?.parentCategory?.name?.toLowerCase() === "gaming accessories"
  );

  const activeFashionCategory = activeCategories?.filter(
    (item) => item?.parentCategory?.name?.toLowerCase() === "fashion"
  );

  const activeHomeArrivalCategory = activeCategories?.filter(
    (item) => item?.parentCategory?.name?.toLowerCase() === "home arrival"
  );

  const activeKitchenCategory = activeCategories?.filter(
    (item) => item?.parentCategory?.name?.toLowerCase() === "kitchen appliances"
  );

  return (
    <section className="container mx-auto px-2 lg:px-10 -mt-[12%] z-10 relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">
          Shop for your home essentials
        </h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {activeHomeCategory?.map((item) => {
            return (
              <div className="group" key={item?._id}>
                <LinkButton href={`/products?filter=${item?.name}`}>
                  <div className="overflow-hidden w-full h-full mx-auto">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item?.name ?? "demo"}
                      width={160}
                      height={160}
                      className="w-fit lg:h-fit mx-auto object-fill group-hover:scale-110 duration-500"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-medium lg:text-start">
                    {item?.name}
                  </h2>
                </LinkButton>
              </div>
            );
          })}
        </div>
        <Link href="/products?filter=home essentials">
          <span className="text-start text-blue-500 font-medium text-sm">
            Discover More in Home
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">Get your game on</h2>
        <div className="mb-5">
          {activeCategories
            ?.filter(
              (item) => item?.name?.toLowerCase() === "gaming accessories"
            )
            ?.map((item) => {
              return (
                <div className="group" key={item?._id}>
                  <LinkButton href={`/products?filter=${item?.name}`}>
                    <div className="overflow-hidden w-full h-full mx-auto">
                      <Image
                        src={
                          item?.attachment ??
                          "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                        }
                        alt={item?.name ?? "demo"}
                        width={700}
                        height={500}
                        className="w-full h-[380px] mx-auto object-fill group-hover:scale-110 duration-500"
                      />
                    </div>
                  </LinkButton>
                </div>
              );
            })}
        </div>
        <Link href="/products?filter=gaming accessories">
          <span className="text-start text-blue-500 font-medium text-sm">
            Shop Gaming
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">Gaming accessories</h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {activeGamingCategory?.map((item) => {
            return (
              <div className="group" key={item?._id}>
                <LinkButton href={`/products?filter=${item?.name}`}>
                  <div className="overflow-hidden w-full h-full mx-auto">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item?.name ?? "demo"}
                      width={160}
                      height={160}
                      className="w-fit h-fit mx-auto object-fill group-hover:scale-110 duration-500"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-medium lg:text-start">
                    {item?.name}
                  </h2>
                </LinkButton>
              </div>
            );
          })}
        </div>
        <Link href="/products?filter=gaming accessories">
          <span className="text-start text-blue-500 font-medium text-sm">
            See More
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">Shop deals in Fashion</h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {activeFashionCategory?.map((item) => {
            return (
              <div className="group" key={item?._id}>
                <LinkButton href={`/products?filter=${item?.name}`}>
                  <div className="overflow-hidden w-full h-full mx-auto">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item?.name ?? "demo"}
                      width={160}
                      height={160}
                      className="w-fit h-fit mx-auto object-fill group-hover:scale-110 duration-500"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-medium lg:text-start">
                    {item?.name}
                  </h2>
                </LinkButton>
              </div>
            );
          })}
        </div>
        <Link href="/products?filter=fashion">
          <span className="text-start text-blue-500 font-medium text-sm">
            See All
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">New Home Arrivals</h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {activeHomeArrivalCategory?.map((item) => {
            return (
              <div className="group" key={item?._id}>
                <LinkButton href={`/products?filter=${item?.name}`}>
                  <div className="overflow-hidden w-full h-full mx-auto">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item?.name ?? "demo"}
                      width={160}
                      height={160}
                      className="w-fit h-fit mx-auto object-fill group-hover:scale-110 duration-500"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-medium lg:text-start">
                    {item?.name}
                  </h2>
                </LinkButton>
              </div>
            );
          })}
        </div>
        <Link href="/products?filter=home">
          <span className="text-start text-blue-500 font-medium text-sm">
            Shop the latest from home
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">Toys</h2>
        <div className="mb-5">
          {activeCategories
            ?.filter((item) => item?.name?.toLowerCase() === "toys")
            ?.map((item) => {
              return (
                <div className="group" key={item?._id}>
                  <LinkButton href={`/products?filter=${item?.name}`}>
                    <div className="overflow-hidden w-full h-full mx-auto">
                      <Image
                        src={
                          item?.attachment ??
                          "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                        }
                        alt={item?.name ?? "demo"}
                        width={700}
                        height={500}
                        className="w-full h-[380px] mx-auto object-fill group-hover:scale-110 duration-500"
                      />
                    </div>
                  </LinkButton>
                </div>
              );
            })}
        </div>
        <Link href="/products?filter=toys">
          <span className="text-start text-blue-500 font-medium text-sm">
            Shop Now
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">Top categories in Kitchen</h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {activeKitchenCategory?.map((item) => {
            return (
              <div className="group" key={item?._id}>
                <LinkButton href={`/products?filter=${item?.name}`}>
                  <div className="overflow-hidden w-full h-full mx-auto">
                    <Image
                      src={
                        item?.attachment ??
                        "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                      }
                      alt={item?.name ?? "demo"}
                      width={160}
                      height={160}
                      className="w-fit h-fit mx-auto object-fill group-hover:scale-110 duration-500"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-medium lg:text-start">
                    {item?.name}
                  </h2>
                </LinkButton>
              </div>
            );
          })}
        </div>
        <Link href="/products?filter=kitchen appliances">
          <span className="text-start text-blue-500 font-medium text-sm">
            Explore all products in kitchen
          </span>
        </Link>
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-medium mb-2">New year, now you</h2>
        <div className="mb-5">
          {activeCategories
            ?.filter((item) => item?.name?.toLowerCase() === "new year")
            ?.map((item) => {
              return (
                <div className="group" key={item?._id}>
                  <LinkButton href={`/products?filter=${item?.name}`}>
                    <div className="overflow-hidden w-full h-full mx-auto">
                      <Image
                        src={
                          item?.attachment ??
                          "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                        }
                        alt={item?.name ?? "demo"}
                        width={700}
                        height={500}
                        className="w-full h-[380px] mx-auto object-fill group-hover:scale-110 duration-500"
                      />
                    </div>
                  </LinkButton>
                </div>
              );
            })}
        </div>
        <Link href="/products?filter=new year">
          <span className="text-start text-blue-500 font-medium text-sm">
            Shop Now
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
