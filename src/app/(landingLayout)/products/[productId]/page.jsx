import SingleProductDetails from "@/components/LandingPages/Products/SingleProductDetails";

const page = ({ params }) => {
  return (
    <div className="bg-white">
      <SingleProductDetails params={params} />
    </div>
  );
};

export default page;
