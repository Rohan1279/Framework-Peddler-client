import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const [ismouseHover, setIsmouseHover] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  const handleMouseHover = () => {
    // console.log("hovering");
    setIsmouseHover(!ismouseHover);
  };
  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition-all duration-[1000ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100  "
      className="font-bold"
    >
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        className="hover:cursor-default card overflow-hidden rounded-none sm:max-w-lg sm:max-h-96 max-h-full md:w-96 bg-base-100 shadow-xl mx-auto"
      >
        <div
          className={`w-full h-full card-body absolute bg-[#edede9]/75 z-10  
     translate-y-full 
      ${ismouseHover && "translate-y-0 "}
      transition-all  ease-in-out duration-500  flex items-center justify-center`}
        >
          <h2 className="text-black font-extrabold text-center text-5xl bg-clip-text text-transparent bg-gradient-to-tl from-stone-700 to-gray-600/50 p-3">
            {category.categoryName}
          </h2>
          <Link to={`/category/${category._id}`}  className="">
            <button
              className={`btn btn-md rounded-none 
            hover:cursor-pointer my-4`}
            >
              Discover more
            </button>
          </Link>
        </div>
        <figure
          className={`z-0 ${
            ismouseHover && "blur-md"
          } transition-all duration-1000`}
        >
          <img
            src={category.categoryImage}
            alt="Category"
          />
        </figure>
      </div>
    </Transition>
  );
};

export default CategoryCard;
