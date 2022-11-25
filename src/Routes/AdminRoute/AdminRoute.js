import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Authcontext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loader />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
