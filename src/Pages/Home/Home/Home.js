import React from "react";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import ExtraSection from "../ExtraSection/ExtraSection";

const Home = () => {
  return (
    <div className="px-2">
      <Banner />
      <Advertisement />
      <Categories />
      <ExtraSection />
    </div>
  );
};

export default Home;
