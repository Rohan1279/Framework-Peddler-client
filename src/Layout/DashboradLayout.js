import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const DashboradLayout = () => {
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
            <li>
              <Link to={"/dashboard"}>My Orders</Link>
            </li>
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
