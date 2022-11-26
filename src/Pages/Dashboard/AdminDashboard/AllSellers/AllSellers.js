import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllSellers = () => {
  const url = `${process.env.REACT_APP_URL}/users/allsellers`;
  const { data: allsellers = [] } = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return (
    <div>
      <h2>All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allsellers?.map((seller, idx) => (
              <tr key={seller._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                      <img src={seller.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{seller.name}</td>
                <td>${seller.email}</td>
                <td>
                  <div>
                    <button
                      // onClick={()=>}
                      className="btn btn-xs btn-error mr-3"
                    >
                      Delete
                    </button>
                    <button className="btn btn-xs btn-info">Verify</button>
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

export default AllSellers;
