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

const CategoryNavigation = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const [drawerStack, setDrawerStack] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

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
              <Link href={`/products?filter=${item?.name}`}>{item?.name}</Link>
            ) : level === "parent" ? (
              <div
                onClick={() => navigateTo(item.categories, item)}
                className="cursor-pointer flex items-center"
              >
                {item?.name}
                <RightOutlined className="ml-2 absolute right-0" />
              </div>
            ) : hasSubcategories ? (
              <div
                onClick={() => navigateTo(item.subcategories, item)}
                className="cursor-pointer flex items-center"
              >
                {item?.name}
                <RightOutlined className="ml-2 absolute right-0" />
              </div>
            ) : (
              <Link href={`/products?filter=${item?.name}`}>{item?.name}</Link>
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
          className="flex items-center text-white hover:text-white gap-2"
          onClick={openDrawer}
        >
          <MenuOutlined />
          All
        </div>
        <div className="flex gap-5 flex-wrap py-3 text-white">
          <Link href={"/offers"}>Offers</Link>
          <Link href={"/products"}>All Products</Link>
        </div>
      </div>

      <Drawer
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
        maskClosable={true}
      >
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
