import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Authcontext } from "../../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(Authcontext);
  const url = `${process.env.REACT_APP_URL}/products?email=${user?.email}`;
  const { data: products = [] } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  console.log(products);
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <div>
      <h3>My Products</h3>
      {products.length}
    </div>
  );
};

export default MyProducts;
