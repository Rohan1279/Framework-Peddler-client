import React from "react";
// import { loadStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Loader from "../../../../Components/Loader";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  // console.log(useLoaderData());
  const order = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <div>
      <h3>Pay for your product</h3>
      {/* <p className="text-3xl">Please pay</p> */}
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order}  />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
