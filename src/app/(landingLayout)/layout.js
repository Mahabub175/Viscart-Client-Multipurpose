import BackToTop from "@/components/Shared/BackToTop";
import FloatingContact from "@/components/Shared/FloatingContact";
import LandingFooter from "@/components/Shared/Footer/LandingFooter";
import BottomNavigation from "@/components/Shared/Navbar/BottomNavigation";
import LandingHeader from "@/components/Shared/Navbar/LandingHeader";
import PopupBanner from "@/components/Shared/PopupBanner";

const LandingLayout = ({ children }) => {
  return (
    <>
      <LandingHeader />
      <div>{children}</div>
      <PopupBanner />
      <FloatingContact />
      <BackToTop />
      <BottomNavigation />
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
