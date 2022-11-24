import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/categories");
      return res.data;
    },
  });

  return (
    <div className="mb-8">
      <h2 className="text-3xl py-8 text-center font-bold">
        Browse Categories: {categories.length}
      </h2>
      <div className="grid grid-cols-3">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="card rounded-none w-72 bg-base-100 shadow-xl mx-auto"
          >
            <figure>
              <img
                src={category.categoryImage}
                alt="Category"
                className="hover:scale-105 brightness-90 hover:brightness-110 transition-all duration-300"
              />
            </figure>
            <div className="card-body p-2 ">
              <h2 className="card-title mx-auto">{category.categoryName}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
