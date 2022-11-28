import React from "react";
// import { loadStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  return (
    <div>
      <h3>Pay for your product</h3>
      {/* <p className="text-3xl">Please pay</p> */}
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
