import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Authcontext } from "../../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(Authcontext);
  const [advertisingProduct, setAdvertisingProduct] = useState("");
  const url = `${process.env.REACT_APP_URL}/products?email=${user?.email}`;
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    console.log(advertisingProduct);
    fetch(
      `${process.env.REACT_APP_URL}/products?product=${advertisingProduct}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Prodcuts set for advertisement");
        }
        setAdvertisingProduct("");
        refetch();
      });
  }, [advertisingProduct, refetch]);

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
              <th>Status</th>
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
                      <img src={product.picture} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.product_name}</td>
                <td>${product.resale_price}</td>
                <td>
                  {
                    <>
                      {product.isSold ? (
                        <button className="btn btn-xs btn-warning rounded-none mr-3">
                          Sold
                        </button>
                      ) : (
                        <button className="btn  btn-info btn-xs rounded-none ">
                          Active
                        </button>
                      )}
                    </>
                  }
                </td>
                <td>
                  <div>
                    <button className="btn btn-xs btn-error mr-3 rounded-none">
                      Delete
                    </button>
                    {product.isAdvertised ? (
                      <button className="btn btn-disabled btn-xs text-white bg-gray-600">
                        Advertised
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setAdvertisingProduct(product._id);
                        }}
                        className="btn btn-xs btn-success rounded-none "
                      >
                        Advertise
                      </button>
                    )}
                  </div>
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
