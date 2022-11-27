import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../Components/ConfirmationModal";

const AllSellers = () => {
  const [sellerEmail, setSellerEmail] = useState("");
  const [deletingSeller, setDeletingSeller] = useState(null);
  const url = `${process.env.REACT_APP_URL}/admin/allsellers`;
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
      });
  }, [sellerEmail, refetch]);

  const handleDelete = (seller) => {
    // console.log(seller);
    fetch(`${process.env.REACT_APP_URL}/admin/seller/${seller.email}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data[0].deletedCount > 0) {
          toast.success(`${seller.name}'s account deleted successfully`);
          refetch();
        }
      });
    console.log();
  };
  const closeModal = () => {
    setDeletingSeller(null);
  };
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
                    <label
                      htmlFor="confirmation-modal"
                      className="btn btn-xs btn-error mr-3 rounded-none"
                      onClick={() => setDeletingSeller(seller)}
                    >
                      Delete
                    </label>
                    {seller.isSellerVerified ? (
                      <button className="btn btn-xs btn-disabled text-slate-500 rounded-none">
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

      {deletingSeller && (
        <ConfirmationModal
          title={`Are you sure you want to delete ${deletingSeller.name}?`}
          message={`Action cannot be undone`}
          successAction={handleDelete}
          closeModal={closeModal}
          modalData={deletingSeller}
          successButtonName="Delete"
        />
      )}
    </div>
  );
};

export default AllSellers;
