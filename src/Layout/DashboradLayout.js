import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Authcontext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/userBuyer";
import useSeller from "../hooks/useSeller";
import Navbar from "../Shared/Navbar/Navbar";

const DashboradLayout = () => {
  const { user } = useContext(Authcontext);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {/* Sidebar content here  */}

            {isBuyer && (
              <li>
                <Link to={"/dashboard/myorders"}>My Orders</Link>
              </li>
            )}
            {isSeller && (
              <>
                <li>
                  <Link to={"/dashboard/addproduct"}>Add a product</Link>
                </li>
                <li>
                  <Link to={"/dashboard/myproducts"}>My Products</Link>
                </li>
                <li>
                  <Link to={"/dashboard/mybuyers"}>My Buyers</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/allsellers"}>All Sellers</Link>
                </li>
                <li>
                  <Link to={"/dashboard/allbuyers"}>All Buyers</Link>
                </li>
                <li>
                  <Link to={"/dashboard/reporteditems"}>Reported Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboradLayout;
