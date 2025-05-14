/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import logo from "@/assets/images/logo.png";
import { useCurrentUser } from "@/redux/services/auth/authSlice";
import { useGetSingleCartByUserQuery } from "@/redux/services/cart/cartApi";
import { useGetSingleCompareByUserQuery } from "@/redux/services/compare/compareApi";
import { useDeviceId } from "@/redux/services/device/deviceSlice";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import { useGetSingleWishlistByUserQuery } from "@/redux/services/wishlist/wishlistApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { AutoComplete, Drawer, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaSearch, FaShoppingBag } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { useSelector } from "react-redux";
import DrawerCart from "../Product/DrawerCart";
import CategoryNavigation from "./CategoryNavigation";

const LandingHeader = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const user = useSelector(useCurrentUser);
  const deviceId = useSelector(useDeviceId);
  const { data: compareData } = useGetSingleCompareByUserQuery(
    user?._id ?? deviceId
  );
  const { data: wishListData } = useGetSingleWishlistByUserQuery(
    user?._id ?? deviceId
  );
  const { data: cartData } = useGetSingleCartByUserQuery(user?._id ?? deviceId);

  const { data: globalData } = useGetAllGlobalSettingQuery();
  const { data: products } = useGetAllProductsQuery();

  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    const filteredOptions = products?.results?.filter(
      (product) =>
        product?.name?.toLowerCase().includes(value.toLowerCase()) ||
        product?.category?.name?.toLowerCase().includes(value.toLowerCase())
    );

    setOptions(
      filteredOptions?.map((product) => ({
        value: product.name,
        label: (
          <Link
            href={`/products/${product?.slug}`}
            className="flex items-center gap-4 hover:text-primary pb-2 border-b border-b-gray-300"
            onClick={() => setIsSearchOpen(false)}
          >
            <Image
              src={formatImagePath(product?.mainImage)}
              alt="product"
              width={80}
              height={50}
              className="object-cover rounded-xl"
            />
            <div className="ml-2">
              <p className="text-lg font-medium">{product?.name}</p>
              <p>
                Price: {globalData?.results?.currency}{" "}
                {product?.offerPrice
                  ? product?.offerPrice
                  : product?.sellingPrice}
              </p>
              <p>Category: {product?.category?.name}</p>
            </div>
          </Link>
        ),
      })) || []
    );
  };

  return (
    <header
      className={`w-full bg-[#0f1111] shadow-md transition-transform duration-300 z-50`}
    >
      <nav className="px-2 py-2 lg:-my-3">
        <div className="flex justify-between lg:justify-around items-center gap-5">
          <Link href={"/"} className="lg:py-5">
            <Image
              src={globalData?.results?.logo ?? logo}
              alt="logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Link>
          <div className="relative w-full hidden lg:block">
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              placeholder="Search for Products..."
              size="large"
              className="w-full"
            />
            <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xl" />
          </div>

          <div className="flex gap-6 items-center">
            <FaSearch
              className="text-white lg:hidden"
              onClick={() => setIsSearchOpen(true)}
            />
            <Link
              href={"/compare"}
              className="hidden lg:flex text-white text-sm cursor-pointer"
            >
              {compareData?.[0]?.product?.length > 0 ? (
                <span className="flex items-center gap-2 hover:text-primary duration-300">
                  <span className="relative">
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {compareData?.[0]?.product?.length}
                    </span>
                    <FaCodeCompare className="rotate-90" />
                  </span>
                  <span>Compare</span>
                </span>
              ) : (
                <div className="flex gap-2 items-center hover:text-primary duration-300">
                  <FaCodeCompare className="rotate-90" />
                  Compare
                </div>
              )}
            </Link>
            <Link
              href={"/wishlist"}
              className="hidden lg:flex text-sm text-white cursor-pointer"
            >
              {wishListData?.length > 0 ? (
                <span className="flex items-center gap-2 hover:text-primary duration-300">
                  <span className="relative">
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {wishListData?.length}
                    </span>
                    <FaHeart />
                  </span>
                  Wishlist
                </span>
              ) : (
                <div className="flex items-center gap-2 hover:text-primary duration-300">
                  <FaHeart />
                  Wishlist
                </div>
              )}
            </Link>
            <div
              className="cursor-pointer text-sm text-white"
              onClick={() => setIsCartOpen(true)}
            >
              {cartData?.length > 0 ? (
                <span className="flex items-center gap-2 hover:text-primary duration-300">
                  <span className="relative">
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {cartData?.length}
                    </span>
                    <FaShoppingBag />
                  </span>
                  Cart
                </span>
              ) : (
                <div
                  className="flex items-center gap-2 hover:text-primary duration-300"
                  onClick={() => setIsCartOpen(true)}
                >
                  <FaShoppingBag />
                  Cart
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex gap-6 items-center bg-[#232f3e]">
        <CategoryNavigation globalData={globalData} />
      </div>

      <Modal
        open={isSearchOpen}
        onCancel={() => setIsSearchOpen(false)}
        footer={null}
        destroyOnClose
        closeIcon={null}
      >
        <AutoComplete
          options={options}
          onSearch={handleSearch}
          placeholder="Search for Products..."
          size="large"
          className="w-full"
        />
        <FaSearch className="absolute right-7 top-1/2 -translate-y-1/2 text-primary text-xl" />
      </Modal>

      <Drawer
        placement="right"
        onClose={() => setIsCartOpen(false)}
        open={isCartOpen}
        width={450}
        keyboard={true}
        destroyOnClose
      >
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <p className="lg:text-2xl font-semibold">Shopping Cart</p>
          <button
            className="mt-1 bg-gray-200 hover:scale-110 duration-500 rounded-full p-1"
            onClick={() => setIsCartOpen(false)}
          >
            <GiCancel className="text-xl text-gray-700" />
          </button>
        </div>
        <DrawerCart data={cartData} setDrawer={setIsCartOpen} />
      </Drawer>
    </header>
  );
};

export default LandingHeader;
