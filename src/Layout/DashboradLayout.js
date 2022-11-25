import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Authcontext } from "../contexts/AuthProvider";
import useBuyer from "../hooks/userBuyer";
import Navbar from "../Shared/Navbar/Navbar";

const DashboradLayout = () => {
  const { user } = useContext(Authcontext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

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
                <Link to={"/dashboard/myorders"} >My Orders</Link>
              </li>
            )}

            {/* {isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/allusers"}>All Users</Link>
                </li>
                <li>
                  <Link to={"/dashboard/adddoctor"}>Add a doctor</Link>
                </li>
                <li>
                  <Link to={"/dashboard/managedoctors"}>Manage Doctors</Link>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboradLayout;
