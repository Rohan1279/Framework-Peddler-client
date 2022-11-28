import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(Authcontext);
  const url = `${process.env.REACT_APP_URL}/orders?email=${user?.email}`;
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  return (
    <div>
      <h3 className="text-3xl mb-5">My Orders</h3>
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
            {orders?.map((order, idx) => (
              <tr key={order._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                      <img src={order.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{order.product_name}</td>
                <td>${order.price}</td>
                <td>
                  {order.isPaid ? (
                    <span className="text-primary">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-primary btn-xs">Pay</button>
                    </Link>
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

export default MyOrders;
