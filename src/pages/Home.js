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

const Home = () => {
  return (
    <div>
      <Info />
      <Hero />
      <TopInteresting />
      <StripeBanner />
      <AuthorBestSelling />
      <FeaturedBooks />
      <Newsletter />
      <Review />
      <Blog />
    </div>
  );
};

export default Home;
