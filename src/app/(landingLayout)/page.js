import Banner from "@/components/LandingPages/Home/Banner";
import RecentlyViewedProducts from "@/components/LandingPages/Home/Products/RecentlyViewedProducts";
import Categories from "@/components/LandingPages/Home/Categories";
import NewArrivalProducts from "@/components/LandingPages/Home/Products/NewArrivalProducts";
import ThirdSectionCategories from "@/components/LandingPages/Home/Products/ThirdSectionCategory";
import OfferProducts from "@/components/LandingPages/Home/Products/OfferProducts";
import FourthSectionCategories from "@/components/LandingPages/Home/Products/FourthSectionCategories";
import FeatureProducts from "@/components/LandingPages/Home/Products/FeaturedProducts";
import FifthSectionCategories from "@/components/LandingPages/Home/Products/FifthSectionCategories";
import TopRatedProducts from "@/components/LandingPages/Home/Products/FeaturedProducts";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <Categories />
      <NewArrivalProducts />
      <ThirdSectionCategories />
      <OfferProducts />
      <FourthSectionCategories />
      <FeatureProducts />
      <FifthSectionCategories />
      <TopRatedProducts />
      <RecentlyViewedProducts />
    </div>
  );
};

export default page;
