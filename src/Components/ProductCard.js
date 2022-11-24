import React from "react";
import { FaAmazon, FaCheck, FaCheckCircle } from "react-icons/fa";
import {
  FaLocationArrow,
  HiArrowRight,
  HiCheck,
  HiClock,
  HiLocationMarker,
} from "react-icons/hi";

const ProductCard = ({ product }) => {
  const {
    category_name,
    picture,
    product_name,
    location,
    resale_price,
    original_price,
    usage_period,
    year_purchased,
    description,
    posted_on,
    condition,
    seller_name,
    seller_default_image,
    isVerified,
  } = product;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl rounded-none">
      <figure className="w-1/3">
        <img src={picture} alt="Album" className="w-[400px] h-[400px]" />
      </figure>
      <div className="px-3 w-2/3  text-left">
        <p className="badge badge-secondary">{condition}</p>
        <h2 className="text-2xl text-left font-bold">{product_name}</h2>
        <p className="text-lg text-left  leading-normal">{description}</p>
        <div className="flex items-center justify-between my-3">
          <div className="flex text-base items-center">
            <HiLocationMarker />
            <p>{location}</p>
          </div>
          <div className="text-base flex items-center justify-center">
            <HiClock />
            <p>{posted_on ? posted_on : "1 year ago"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="avatar  flex items-center justify-center">
            <div className="w-12 rounded-full ring mr-3 indicator ">
              <img src={seller_default_image} alt="" className="" />
            </div>

            <p className="text-2xl mr-3">{seller_name}</p>
            {isVerified && <FaCheckCircle className="text-blue-400" />}
          </div>
          <p className="text-lg badge badge-info px-2 py-3">
            Purchased on: <span className="font-bold">{year_purchased}</span>
          </p>
        </div>
        <div className="my-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="rounded-sm bg-red-400 mx-2 line-through px-5 py-2 text-2xl text-black">
                ${original_price}
              </span>
              <span className="rounded-sm bg-green-400 mx-2 text-black px-5 py-2 text-2xl ">
                ${resale_price}
              </span>
            </div>
            <span className="badge badge-accent">Used for {usage_period}</span>
          </div>

          <div className="card-body">
            <button className="btn btn-outline rounded-md ">Book now!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

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
