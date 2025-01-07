import Banner from "@/components/LandingPages/Home/Banner";
import Categories from "@/components/LandingPages/Home/Categories";
import FeatureProducts from "@/components/LandingPages/Home/Products/FeaturedProducts";
import FifthSectionCategories from "@/components/LandingPages/Home/Products/FifthSectionCategories";
import FourthSectionCategories from "@/components/LandingPages/Home/Products/FourthSectionCategories";
import NewArrivalProducts from "@/components/LandingPages/Home/Products/NewArrivalProducts";
import OfferProducts from "@/components/LandingPages/Home/Products/OfferProducts";
import ThirdSectionCategories from "@/components/LandingPages/Home/Products/ThirdSectionCategory";
import TopRatedProducts from "@/components/LandingPages/Home/Products/TopRatedProducts";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart website.",
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
    </div>
  );
};

export default page;
