import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../../../../Components/SmallLoader";
import { Authcontext } from "../../../../contexts/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(Authcontext);
  console.log(user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sellerInfo, SetsellerInfo] = useState([]);
  useEffect(() => {}, []);

  const handleAddProduct = (data) => {
    setIsLoading(true);
    let category_id = "637eb96cdd59c8779cf07ba7";
    if (data.category_name === "Network Modules") {
      category_id = "637eb96cdd59c8779cf07ba8";
    } else if (data.category_name === "Main boards") {
      category_id = "637eb96cdd59c8779cf07ba9";
    }
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let posted_on = `${day}-${month}-${year}`;

    // const posted_on = new
    const product = {
      category_id,
      category_name: data.category_name,
      condition: data.condition,
      description: data.description,
      location: data.location,
      original_price: data.original_price,
      picture: data.picture,
      product_name: data.product_name,
      resale_price: data.resale_price,
      seller_phone: data.seller_phone,
      usage_period: data.usage_period,
      year_purchased: data.year_purchased,
      posted_on,
      seller_id: user?.uid,
      seller_name: user?.displayName,
      seller_email: user?.email,
      seller_default_image:
        "https://static.vecteezy.com/system/resources/thumbnails/009/312/919/small/3d-render-cute-girl-sit-crossed-legs-hold-laptop-studying-at-home-png.png",
      isPaid: false,
      isAdvertised: false,
      isReported: false,
    };
    // console.log(product);
    fetch(`${process.env.REACT_APP_URL}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          toast.success(`${data.product_name}'s data added successfully`);
          navigate("/dashboard/myproducts");
        }
      });
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-3xl text-center">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="grid grid-cols-2 gap-3 mt-10 "
      >
        <input
          // name="product_name"
          type="text"
          placeholder="product name"
          {...register("product_name", {
            required: "name is required",
          })}
          className="input  w-full input-bordered text-center"
          // required
        />
        {/* <span className="inline">When did you purchased the product?</span> */}
        <input
          name="year_purchased"
          {...register("year_purchased", {
            required: "year is required",
          })}
          type="text"
          placeholder="year purchased"
          className="input  w-full input-bordered text-center"
        />

        <select
          {...register("condition")}
          className="select select-bordered w-full text-base"
        >
          <option disabled defaultChecked className="text-green-400">
            Pick product condition
          </option>
          <option>excellent</option>
          <option>good</option>
          <option>fair</option>
        </select>
        <select
          {...register("category_name")}
          className="select select-bordered w-full text-base"
        >
          <option disabled defaultChecked className="text-green-400">
            Choose a category
          </option>
          <option>Network Modules</option>
          <option>Memory & Storage</option>
          <option>Main boards</option>
        </select>

        <input
          // name="seller_phone"
          {...register("seller_phone", {
            required: "phone number is required",
          })}
          type="text"
          placeholder="your phone number"
          className="input  w-full input-bordered text-center"
          required
        />
        <input
          // name="location"
          {...register("location", {
            required: "location is required",
          })}
          type="text"
          placeholder="meeting location"
          className="input  w-full input-bordered"
          // required
        />
        {/* <br /> */}
        <div className="flex items-center justify-around ">
          <span className="text-lg mr-7">Price: $</span>
          <input
            // name="original_price"
            {...register("original_price")}
            type="text"
            // defaultValue={product?.resale_price}
            placeholder="original price"
            maxLength={4}
            className="input  w-32 input-bordered  text-center"
            // required
          />
          <input
            // name="resale_price"
            {...register("resale_price", {
              required: "resale price is required",
            })}
            type="text"
            // defaultValue={product?.resale_price}
            placeholder="resale price"
            maxLength={4}
            className="input  w-32 input-bordered  text-center"
            // required
          />
        </div>
        <input
          // name="usage_period"
          {...register("usage_period", {
            required: "usage period is required",
          })}
          type="text"
          // defaultValue={product?.resale_price}
          placeholder="usage period"
          maxLength={10}
          className="input  w-full input-bordered  text-center"
          // required
        />

        <textarea
          {...register("description")}
          // name="description"
          className="textarea textarea-bordered col-span-2"
          placeholder="Description about the product"
        ></textarea>
        <input
          // name="picture"
          {...register("picture")}
          type="text"
          // defaultValue={product?.resale_price}
          placeholder="provide a photo URL of your product"
          className="input  input-bordered  text-center col-span-2"
          // required
        />
        <button className="btn btn-accent col-span-2">
          {isLoading ? <SmallLoader /> : <input type="submit" value="Submit" />}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

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
