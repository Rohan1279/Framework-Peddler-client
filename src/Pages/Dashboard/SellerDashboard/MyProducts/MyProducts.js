import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, idx) => (
              <tr key={product._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                      <img src={product.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.product_name}</td>
                <td>${product.price}</td>
                <td>
                  {product.price && !product.paid && (
                    <Link to={`/dashboard/payment/${product._id}`}>
                      <button className="btn btn-primary btn-xs">Pay</button>
                    </Link>
                  )}
                  {product.price && product.paid && (
                    <span className="text-primary">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
