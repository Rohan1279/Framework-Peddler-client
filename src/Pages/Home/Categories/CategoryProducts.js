import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../../../Components/ProductCard";

const CategoryProducts = () => {
  const products = useLoaderData();

  return (
    <div className="px-16">
      <h3 className="text-3xl text-center">
        Products available of{" "}
        <span className="underline decoration-blue-300">
          {products[0].category_name}
        </span>
        : {products.length}
        <div className="grid gap-10 my-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </h3>
    </div>
  );
};

export default CategoryProducts;
