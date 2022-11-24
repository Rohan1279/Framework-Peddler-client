import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authcontext } from "../../../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const location = useLocation();
  if (loading) {
    return (
      <p className="w-20 h-20 rounded-full border-8 border-primary border-dashed animate-spin mx-auto mt-10"></p>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoute;
