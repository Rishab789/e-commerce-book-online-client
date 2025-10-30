import React from "react";
import Info from "../components/Info";
import Hero from "../components/Hero";
import TopInteresting from "../components/TopInteresting";
import StripeBanner from "../components/StripeBanner";
import AuthorBestSelling from "../components/AuthorBestSelling";
import FeaturedBooks from "../components/FeaturedBooks";
import Newsletter from "../components/Newsletter";
import Review from "../components/Review";
import Blog from "../components/Blog";
import AreYouSure from "../modals/AreYouSure";
import NewArrivals from "../components/NewArrivals";
import DiscountStrip from "../components/DiscountStrip";

const Home = () => {
  return (
    <div>
      <DiscountStrip />
      <Info />
      <Hero />
      <TopInteresting />
      <StripeBanner />
      <AuthorBestSelling />
      <FeaturedBooks />
      <Newsletter />
      <Review />
      <NewArrivals />
      {/* <Blog /> */}
    </div>
  );
};

export default Home;
