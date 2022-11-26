import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../../../../contexts/AuthProvider";

const AllBuyers = () => {
  // const { user } = useContext(Authcontext);
  const url = `${process.env.REACT_APP_URL}/users/allbuyers`;
  const { data: allbuyers = [] } = useQuery({
    queryKey: ["allbuyers"],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  const handleDelete = (buyer) => {
    console.log(buyer);
  };
  return (
    <div>
      <h2>All Buyers</h2>
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
            {allbuyers?.map((buyer, idx) => (
              <tr key={buyer._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                      <img src={buyer.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{buyer.name}</td>
                <td>${buyer.email}</td>
                <td>
                  <div>
                    <button
                      // onClick={()=>}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default AllBuyers;
