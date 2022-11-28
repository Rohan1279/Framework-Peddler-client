import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../../Components/BookingModal";
import ProductCard from "../../../Components/ProductCard";
import { Authcontext } from "../../../contexts/AuthProvider";

const CategoryProducts = () => {
  const products = useLoaderData();
  console.log(products);
  // const {
  //   data: products = [],
  //   refetch,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () =>
  //     fetch(`http://localhost:5000/appoinmentOptions?date=${date}`).then(
  //       (res) => res.json()
  //     ),
  // });
  const [product, setProduct] = useState(null);
  const { user } = useContext(Authcontext);
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
            <ProductCard
              key={product._id}
              product={product}
              setProduct={setProduct}
            />
          ))}
          {user && user?.email && product && (
            <BookingModal product={product} setProduct={setProduct} />
          )}
        </div>
      </h3>
    </div>
  );
};

export default CategoryProducts;
