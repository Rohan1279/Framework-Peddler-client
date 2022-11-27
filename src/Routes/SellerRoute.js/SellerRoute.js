import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Authcontext } from "../../contexts/AuthProvider";
import useSeller from "../../hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  // console.log(isSeller);
  const location = useLocation();
  if (loading || isSellerLoading) {
    return <Loader />;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
