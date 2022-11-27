import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../../Components/ConfirmationModal";
import { Authcontext } from "../../../../contexts/AuthProvider";

const AllBuyers = () => {
  // const { user } = useContext(Authcontext);
  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const url = `${process.env.REACT_APP_URL}/users/allbuyers`;
  const { data: allbuyers = [], refetch } = useQuery({
    queryKey: ["allbuyers"],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  const handleDelete = (buyer) => {
    console.log(deletingBuyer);
    fetch(`${process.env.REACT_APP_URL}/admin/buyer/${buyer._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${buyer.name} deleted successfully`);
          refetch();
        }
      });
    console.log();
  };
  const closeModal = () => {
    setDeletingBuyer(null);
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
                    <label
                      htmlFor="confirmation-modal"
                      className="btn btn-sm btn-error"
                      onClick={() => setDeletingBuyer(buyer)}
                    >
                      Delete
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title={`Are you sure you want to delete ${deletingBuyer.name}?`}
          message={`Action cannot be undone`}
          successAction={handleDelete}
          closeModal={closeModal}
          modalData={deletingBuyer}
          successButtonName="Delete"
        />
      )}
    </div>
  );
};

export default AllBuyers;
