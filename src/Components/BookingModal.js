import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Authcontext } from "../contexts/AuthProvider";

const BookingModal = ({ product, setProduct }) => {
  const { user } = useContext(Authcontext);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const order = {
      product_name: product?.product_name,
      product_id : product?._id,
      price: product?.resale_price,
      image: product?.picture,
      buyer: name,
      email,
      phone,
      location,
      seller_email: product.seller_email,
      seller_id: product.seller_id,
    };
    setProduct(null);
    console.log(order);
    // ${process.env.REACT_APP_URL}
    fetch(`${process.env.REACT_APP_URL}/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setProduct(null);
          console.log(data);
          toast.success("Orders confirmed");
          // refetch();
        } else {
          setProduct(null);
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{product?.product_name}</h3>

          <form onSubmit={handleOrder} className="grid grid-cols-1 gap-3 mt-10">
            <input
              name="name"
              type="text"
              placeholder="your name"
              defaultValue={user?.displayName}
              className="input w-full input-bordered bg-slate-400 text-black"
              readOnly
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              placeholder="email address"
              className="input w-full input-bordered bg-slate-400 text-black"
              readOnly
            />

            <input
              name="phone"
              type="text"
              placeholder="phone number"
              className="input w-full input-bordered"
              required
            />
            <input
              name="location"
              type="text"
              placeholder="meeting location"
              className="input w-full input-bordered"
              required
            />
            {/* <br /> */}
            <div className="flex items-center justify-end">
              <span className="text-lg mr-7">Price: $</span>
              <input
                name="price"
                type="text"
                defaultValue={product?.resale_price}
                // placeholder="email address"
                className="input w-20 input-bordered bg-slate-400 text-black text-xl font-bold text-center"
                readOnly
              />
            </div>
            <input
              type="submit"
              className="input w-full input-bordered btn btn-accent "
              value="Submit"
            />
          </form>

          {/* <div className="modal-action">
            <label
              htmlFor="booking-modal"
              className="btn"
              //  onClick={}
            >
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
