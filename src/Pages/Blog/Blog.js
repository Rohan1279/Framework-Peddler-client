import React from "react";
import { useLoaderData } from "react-router-dom";

const Blog = () => {
  const order = useLoaderData();
  console.log(order);
  return (
    <div>
      <h2>Blog Page</h2>
    </div>
  );
};

export default Blog;
