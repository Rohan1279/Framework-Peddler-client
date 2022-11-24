import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    return () => {};
  }, []);

  return (
    <div>
      <h2 className="text-3xl py-8 text-center">
        Browse Categories: {categories.length}
      </h2>
      <div className="grid grid-cols-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="card w-72 bg-base-100 shadow-xl mx-auto"
          >
            <figure>
              <img
                src={category.categoryImage}
                alt="Category"
                className="hover:scale-105 transition-all duration-300"
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
