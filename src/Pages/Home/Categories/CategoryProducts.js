import React from "react";
import { useLoaderData } from "react-router-dom";

const CategoryProducts = () => {
  const products = useLoaderData();
  console.log(products);
  const { category_name } = products;
  return (
    <div>
      <h3 className="text-3xl text-center">
        Products available of{" "}
        <span className="underline decoration-blue-300">
          {products[0].category_name}
        </span>
        : {products.length}
      </h3>
    </div>
  );
};

export default CategoryProducts;

// {
//   "category_id": "637eb96cdd59c8779cf07ba7",
//   "category_name": "Memory & Storage",
//   "picture": "https://media.istockphoto.com/id/1338265527/photo/flying-parts-of-a-notebook-computer-hardware-components-mainboard-cpu-processor-display-ram.jpg?s=612x612&w=0&k=20&c=Mr7KnDBUFSXgrqmyYJ071yEucSh7pUFIM1L9CItnEYQ=",
//   "product_name": "Speaker Kit",
//   "location": "Chittagong ,Bangladesh",
//   "resale_price": "19",
//   "original_price": "30",
//   "usage_period": "1 month",
//   "year_purchased": "2019",
//   "description": "The time has come for consumer electronics products that are designed to last: products that give you back the power to upgrade, customize, and repair them. We’re excited for the opportunity to fix the consumer electronics industry together.",
//   "posted_on": "",
//   "condition": "excellent",
//   "seller_name": "Sarah Collins",
//   "seller_phone": "01841234567",
//   "seller_email": "sarah@collins.com",
//   "seller_default_image": "https://static.vecteezy.com/system/resources/thumbnails/009/312/919/small/3d-render-cute-girl-sit-crossed-legs-hold-laptop-studying-at-home-png.png",
//   "isVerified": true
// },
