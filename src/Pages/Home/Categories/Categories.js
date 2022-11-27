import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL}/categories`);
      console.log();
      return res.data;
    },
  });

  return (
    <div className="mb-8">
      <h2 className="text-3xl py-8 text-center font-bold">
        Browse Categories: {categories.length}
      </h2>
      <div className="grid lg:grid-cols-3">
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="hover:cursor-default"
          >
            <div className="card rounded-none w-72 bg-base-100 shadow-xl mx-auto ">
              <div
                className={`w-full h-full absolute bg-gray-700/80 z-10 opacity-0 
              hover:opacity-100 transition-all duration-300 flex justify-center items-end`}
              >
                <button className="btn btn-sm hover:cursor-pointer mb-10">
                  Discover more
                </button>
              </div>
              <figure className="z-0">
                <img
                  src={category.categoryImage}
                  alt="Category"
                  className={`hover:scale-105  brightness-90 hover:brightness-110 transition-all duration-300`}
                />
              </figure>
              <div className="card-body p-2 ">
                <h2 className="card-title mx-auto">{category.categoryName}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
