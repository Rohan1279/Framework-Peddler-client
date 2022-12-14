import { Transition } from "@headlessui/react";
import React, { useState } from "react";

const Banner = () => {
  const [isShowing, setIsShowing] = useState(true);

  return (
    

    <section className="relative bg-[url(https://i.ibb.co/mJ5H4tz/ezgif-com-gif-maker.jpg)] bg-cover bg-no-repeat">
      <Transition
    appear={true}
    show={isShowing}
    enter="transition-all duration-[2000ms] "
    enterFrom="opacity-100 "
    enterTo="opacity-0  "
    className="font-bold"
  >

      <div className="absolute inset-0 bg-white/100 sm:bg-transparent bg-gradient-to-r from-cyan-600 to-blue-300 "></div>

  </Transition>

      <div className="relative max-w-screen-xl py-32 sm:px-6 lg:flex lg:h-screen lg:items-center">
        <div className="p-12 mr-auto max-w-xl text-center sm:text-left">
          <Transition
            appear={true}
            show={isShowing}
            enter="transition-all duration-1000 "
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100"
            className="font-bold"
          >
            {/* Your content goes here*/}
            <h1 className="text-6xl font-extrabold text-black sm:text-4xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700 ">
                best hardware
              </strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-gray-200">
              A all in one trade-off solution for your favorite day-to-day used
              laptop.
            </p>
          </Transition>
          <Transition
            appear={true}
            show={isShowing}
            enter="transition-all duration-[1000ms] "
            enterFrom="opacity-0 w-10"
            enterTo="opacity-100 w-full"
            className="font-bold"
          >
            <hr className="mt-5 border-red-500 " />
          </Transition>
          <Transition
            appear={true}
            show={isShowing}
            enter="transition-all duration-1000 delay-1000"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            className="font-bold"
          >
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </Transition>
        </div>
      </div>
    </section>

  
  );
};

export default Banner;
