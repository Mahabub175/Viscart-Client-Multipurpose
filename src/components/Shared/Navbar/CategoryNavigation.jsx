"use client";

import { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import {
  ArrowLeftOutlined,
  MenuOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Drawer, Button, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "@/redux/services/device/deviceSlice";

const CategoryNavigation = ({ globalData }) => {
  const dispatch = useDispatch();

  const { data: categories } = useGetAllCategoriesQuery();
  const [drawerStack, setDrawerStack] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const itemClickHandler = (item) => {
    if (item?.name) {
      dispatch(setFilter(item?.name));
      setDrawerVisible(false);
    }
    if (item === "All") {
      dispatch(resetFilter());
    }
  };

  const openDrawer = () => {
    setDrawerVisible(true);
    const parentCategories = categories?.results?.filter(
      (item) => item?.level === "parentCategory"
    );
    setCurrentItems(parentCategories || []);
    setCurrentTitle("");
    setDrawerStack([]);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setCurrentItems([]);
    setCurrentTitle("");
    setDrawerStack([]);
  };

  const navigateTo = (items, currentCategory) => {
    setDrawerStack((prevStack) => [
      ...prevStack,
      { title: currentTitle, items: currentItems },
    ]);
    setCurrentItems(items);
    setCurrentTitle(currentCategory?.name || "");
  };

  const goBack = () => {
    const previousState = drawerStack.pop();
    if (previousState) {
      setCurrentItems(previousState.items);
      setCurrentTitle(previousState.title);
      setDrawerStack([...drawerStack]);
    }
  };

  const renderMenuItems = (items, level) => {
    return items.map((item) => {
      const hasCategories = item?.categories?.length > 0;
      const hasSubcategories = item?.subcategories?.length > 0;

      return (
        <Menu.Item key={item?._id}>
          <div className="flex items-center relative">
            {level === "parent" && !hasCategories ? (
              <p onClick={() => itemClickHandler(item)}>
                <Link href={`/products`}>{item?.name}</Link>
              </p>
            ) : level === "parent" ? (
              <div className="cursor-pointer flex items-center">
                <p onClick={() => itemClickHandler(item)}>
                  <Link href={`/products`}>{item?.name}</Link>
                </p>
                <RightOutlined
                  className="ml-2 absolute right-0"
                  onClick={() => navigateTo(item.categories, item)}
                />
              </div>
            ) : hasSubcategories ? (
              <div className="cursor-pointer flex items-center">
                <p onClick={() => itemClickHandler(item)}>
                  <Link href={`/products`}>{item?.name}</Link>
                </p>
                <RightOutlined
                  className="ml-2 absolute right-0"
                  onClick={() => navigateTo(item.subcategories, item)}
                />
              </div>
            ) : (
              <p onClick={() => itemClickHandler(item)}>
                <Link href={`/products`}>{item?.name}</Link>
              </p>
            )}
          </div>
        </Menu.Item>
      );
    });
  };

  return (
    <div className="px-2 lg:px-5 -my-2">
      <div className="flex items-center justify-between py-2 lg:py-3 text-white gap-5">
        <div
          className="flex items-center text-white hover:text-white gap-2 cursor-pointer"
          onClick={openDrawer}
        >
          <MenuOutlined />
          All
        </div>
        <div className="flex gap-5 flex-wrap py-3 text-white">
          <p onClick={() => itemClickHandler("All")}>
            <Link href={"/offers"}>Offers</Link>
          </p>{" "}
          <p onClick={() => itemClickHandler("All")}>
            <Link href={"/products"}>All Products</Link>
          </p>
        </div>
      </div>

      <Drawer
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
        maskClosable={true}
      >
        <div className="flex items-center justify-between gap-4 -mt-5">
          <Link href={"/"}>
            <Image
              src={globalData?.results?.logo}
              alt="logo"
              width={80}
              height={80}
              className="w-full h-full"
            />
          </Link>
          <button
            className="mt-1 bg-gray-200 hover:scale-110 duration-500 rounded-full p-1"
            onClick={closeDrawer}
          >
            <GiCancel className="text-xl text-gray-700" />
          </button>
        </div>
        <div className="flex items-center">
          {drawerStack.length > 0 && (
            <Button
              onClick={goBack}
              icon={<ArrowLeftOutlined />}
              className="mr-2"
            />
          )}
          {currentTitle}
        </div>
        <div className="flex flex-col py-3 text-black">
          <Menu>
            {renderMenuItems(
              currentItems,
              drawerStack.length === 0 ? "parent" : "category"
            )}
          </Menu>
        </div>
      </Drawer>
    </div>
  );
};

export default CategoryNavigation;
