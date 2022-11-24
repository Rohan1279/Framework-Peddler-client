import React from "react";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import ExtraSection from "../ExtraSection/ExtraSection";

const Home = () => {
  return (
    <div className="px-16">
      <Banner />
      <Categories />
      <ExtraSection />
    </div>
  );
};

export default Home;
