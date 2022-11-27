import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllSellers = () => {
  const [sellerEmail, setSellerEmail] = useState("");
  const url = `${process.env.REACT_APP_URL}/users/allsellers`;
  const { data: allsellers = [], refetch } = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    // console.log(sellerEmail);
    fetch(
      `${process.env.REACT_APP_URL}/users/allsellers/seller/${sellerEmail}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
        console.log(data);
        // setSellerVerification(data.user.isSellerVerified);
      });
  }, [sellerEmail]);

  // const handleSellerVerify = (seller) => {
  //   setSellerEmail(seller.email);
  //   // console.log(sellerEmail);
  //   verifySeller(sellerEmail);
  // };
  // const verifySeller = (email) => {
  //   console.log(email);
  // };
  // console.log(sellerEmail);
  // console.log(allsellers);
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
                    {seller.isSellerVerified ? (
                      <button className="btn btn-xs btn-disabled text-slate-500">
                        Verified
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => setSellerEmail(seller.email)}
                      >
                        Verify
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

export default AllSellers;
