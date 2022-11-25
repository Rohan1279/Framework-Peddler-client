import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaAppStore, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallLoader from "../../Components/SmallLoader";
import { Authcontext } from "../../contexts/AuthProvider";
import { useToken } from "../../hooks/useToken";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Register = () => {
  const { createUser, authenticateWithProvider, updateUserProfile } =
    useContext(Authcontext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [createUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createUserEmail);
  const [userRole, setUserRole] = useState("Buyer");
  const [isLoading, setIsLoading] = useState(false);
  const buyerRef = useRef();
  const sellerRef = useRef();
  if (token) {
    navigate("/");
  }
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = { displayName: name };
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(name, email, userRole);
          })
          .catch((err) => console.log(err));
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => console.log(err));
  };

  const saveUser = (name, email, userRole) => {
    const user = { name, email, userRole };
    fetch(`${process.env.REACT_APP_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
        if (data.acknowledged) {
          toast.success("Acoount created successfully");
          setIsLoading(false);
          navigate(from, { replace: true });
        }
        console.log(data);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Register now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-8">
            <form onSubmit={handleRegister} className="card-body w-96 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="your name"
                  name="name"
                  className="input input-bordered"
                  // required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* user role */}
              <div className="flex w-full justify-evenly items-center my-3">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mx-3 text-xl" ref={buyerRef}>
                      Buyer
                    </span>
                    <input
                      // onChange={handleUserRole}
                      onChange={() => setUserRole(buyerRef.current.innerText)}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-yellow-500"
                      // checked
                      defaultChecked
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mx-3 text-xl" ref={sellerRef}>
                      Seller
                    </span>
                    <input
                      // onChange={handleUserRole}
                      onChange={() => setUserRole(sellerRef.current.innerText)}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-fuchsia-500"
                    />
                  </label>
                </div>
              </div>
              <div className="divider ">OR</div>
              <div className="flex  mx-auto gap-x-10">
                <FaGoogle
                  className="text-4xl text-white bg-gray-500 p-2 rounded-full"
                  onClick={() => handleAuthenticate(googleProvider)}
                />
                <FaGithub
                  className="text-4xl text-white bg-gray-500 p-2 rounded-full"
                  onClick={() => handleAuthenticate(githubProvider)}
                />
              </div>
              <div className="form-control mt-6 ">
                <button className="btn btn-primary">
                  {isLoading ? (
                    <SmallLoader />
                  ) : (
                    <input
                      type="submit"
                      value="Register"
                      className="text-base"
                    />
                  )}
                </button>
              </div>
            </form>
            <p className=" text-center">
              Already a user?{" "}
              <Link to={"/login"} className="text-orange-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
