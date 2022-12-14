import { useContext } from "react";
import toast from "react-hot-toast";
import { HiUser } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { Authcontext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(Authcontext);

  return (
    <div className="">
      <div className="navbar bg-inherit">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-4 text-left"
            >
              <li>
                <Link className="px-1 py-2" to={"/"}>
                  Main
                </Link>
              </li>
              {user?.email && (
                <li>
                  <Link className="px-1 py-2" to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
              )}
              {/* {user?.email && (
                <>
                  <li>
                    <Link className="px-1 py-2" to={"/myreview"}>
                      My reviews
                    </Link>
                  </li>
                  <li>
                    <Link className="px-1 py-2" to={"/addservice"}>
                      Add service
                    </Link>
                  </li>
                </>
              )} */}
              <li>
                <Link className="px-1 py-2" to={"/blog"}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to={"/"}
            className=" normal-case text-2xl rounded-none text-white hidden lg:block leading-10 bg-amber-400 px-2 py-1  hover:bg-amber-500 active:scale-95 transition-all"
          >
            <div className="flex justify-between items-center">
              {/* <img
                src={websitelogo}
                alt=""
                className="w-12 h-12 rounded-full  mr-2"
              /> */}
              <p className="font-bold font text-black">Framework Peddler</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-xl mx-5 " : "text-xl mx-5"
              }
            >
              Main
            </NavLink>

            {user?.email && (
              <>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    isActive ? "text-xl mx-5 " : "text-xl mx-5"
                  }
                >
                  <li>Dashboard</li>
                </NavLink>
              </>
            )}
            <NavLink
              to={"/blog"}
              className={({ isActive }) =>
                isActive ? "text-xl mx-5 " : "text-xl mx-5"
              }
            >
              <li>Blog</li>
            </NavLink>
          </ul>
        </div>

        <div className="navbar-center">
          <Link
            to={"/"}
            className=" rounded-none normal-case text-xl block lg:hidden leading-10 bg-amber-300 px-2 py-1 hover:bg-amber-400 active:scale-95 transition-all"
          >
            <div className="flex justify-between items-center">
              {/* <img
                // src={websitelogo}
                alt=""
                className="w-12 h-12 rounded-full mr-2 hidden lg:block"
              /> */}
              <p className="font-bold text-black">Framework Peddler</p>
            </div>
          </Link>
        </div>

        <div className="navbar-end  flex items-center">
          {user && user?.email && (
            <label
              htmlFor="dashboard-drawer"
              tabIndex={2}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}

          {/* swap theme begins*/}
          <label className="swap  swap-rotate mr-4 shadow-md p-1 rounded-lg ">
            <input type="checkbox" />

            <svg
              className="swap-on fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off fill-currentw-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {/* swap theme ends*/}

          {user?.email && user?.uid ? (
            <div className="bg-amber-300 rounded-none hidden lg:block  px-2 py-1 mx-3 shadow-md ">
              <h4 className="text-black">Welcome,</h4>
              <p className="font-bold text-black">{user?.displayName}</p>
            </div>
          ) : (
            <>
              <Link className="mx-2 hidden lg:block" to={"/login"}>
                Login
              </Link>
              <Link className="mx-2 hidden lg:block" to={"/register"}>
                Register
              </Link>
            </>
          )}

          <div className="dropdown dropdown-end ">
            <label
              tabIndex={0}
              className="avatar tooltip tooltip-bottom z-50"
              data-tip={`${
                user?.displayName ? user.displayName : "Please, login"
              }`}
            >
              <div className="w-10 rounded-full ">
                {user && user.uid ? (
                  <>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="tooltip tooltip-bottom"
                      data-tip=""
                    />
                  </>
                ) : (
                  <HiUser
                    className="text-4xl tooltip tooltip-bottom"
                    data-tip="Login to see username"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user && user.uid ? (
                <>
                  <li>
                    <Link to={"/"} className="justify-between">
                      Profile
                      <span className="badge animate-pulse">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        logOut().then(() =>
                          toast.success("Logged out successfully!")
                        )
                      }
                      to={"/"}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="lg:hidden">
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li className="lg:hidden">
                    <Link to={"/register"}>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
