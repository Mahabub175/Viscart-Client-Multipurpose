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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [subCategoryDrawerVisible, setSubCategoryDrawerVisible] =
    useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const openDrawer = () => setDrawerVisible(true);

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSubCategoryDrawerVisible(false);
    setCurrentCategory(null);
  };

  const openSubCategoryDrawer = (category) => {
    if (category?.categories?.length > 0) {
      setCurrentCategory(category);
      setSubCategoryDrawerVisible(true);
    }
  };

  const backToParentDrawer = () => {
    setSubCategoryDrawerVisible(false);
    setCurrentCategory(null);
  };

  const renderSubcategories = (category) => {
    if (category?.categories?.length > 0) {
      return (
        <Menu>
          {category.categories.map((subCategory) => (
            <Menu.Item key={subCategory?._id}>
              <Link href={`/products?filter=${subCategory?.name}`}>
                {subCategory?.name}
                {subCategory?.categories &&
                  subCategory?.categories.length > 0 && (
                    <RightOutlined className="ml-2" />
                  )}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      );
    } else {
      return <p>No categories available</p>;
    }
  };

  const renderParentCategories = () => {
    return categories?.results
      ?.filter((item) => item?.level === "parentCategory")
      .map((parentCategory) => {
        return parentCategory?.categories?.length > 0 ? (
          <Menu.Item
            key={parentCategory?._id}
            onClick={() => openSubCategoryDrawer(parentCategory)}
          >
            <div className="flex items-center relative">
              {parentCategory?.name}
              {parentCategory?.categories &&
                parentCategory?.categories.length > 0 && (
                  <RightOutlined className="ml-2 absolute right-0" />
                )}
            </div>
          </Menu.Item>
        ) : (
          <Menu.Item key={parentCategory?._id}>
            <Link
              href={`/products?filter=${parentCategory?.name}`}
              className="flex items-center"
            >
              {parentCategory?.name}
              {parentCategory?.categories &&
                parentCategory?.categories.length > 0 && (
                  <RightOutlined className="ml-2" />
                )}
            </Link>
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
        title="Categories"
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
      >
        <div className="flex flex-col py-3 text-black">
          <Menu>{renderParentCategories()}</Menu>
        </div>
      </Drawer>

      <Drawer
        placement="left"
        onClose={closeDrawer}
        open={subCategoryDrawerVisible}
        width={300}
      >
        <div className="flex items-center">
          <Button onClick={backToParentDrawer} icon={<ArrowLeftOutlined />} />
          <span className="ml-2">{currentCategory?.name}</span>
        </div>
        <div className="flex flex-col py-3 text-black">
          {currentCategory ? renderSubcategories(currentCategory) : null}
        </div>
      </Drawer>
    </div>
  );
};

export default CategoryNavigation;
