import React, { useContext, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Authcontext } from "../../contexts/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useToken } from "../../hooks/useToken";
import SmallLoader from "../../Components/SmallLoader";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
  const { loading, login, authenticateWithProvider } = useContext(Authcontext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [createUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createUserEmail);
  const [isLoading, setIsLoading] = useState(false);

  if (token) {
    navigate(from, { replace: true });
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const user = result.user;
        setCreatedUserEmail(user.email);
        const currentUser = {
          email: user.email,
        };
        toast.success("Login successfull");
      })
      .catch((err) => {
        toast.error(err.message);
        setIsLoading(false);
      });
  };
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(result?.user.displayName, result?.user.email, "Buyer");
      })
      .catch((err) => console.log(err));
  };
  const saveUser = (name, email, userRole) => {
    const user = { name, email, userRole };
    console.log(user);
    // fetch(`${process.env.REACT_APP_URL}/users`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
  };
  return (
    <div>
      {loading && (
        <>
          <div className="flex items-center justify-center space-x-2 my-10">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white-400"></div>
          </div>
        </>
      )}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-8">
            <form onSubmit={handleLogin} className="card-body w-96 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
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
                />
              </div>
              <div className="divider ">OR</div>
              <div className="flex  mx-auto gap-x-10">
                <FaGoogle
                  className="text-4xl text-white bg-gray-500 p-2 rounded-full active:p-3 transition-all"
                  onClick={() => handleAuthenticate(googleProvider)}
                />
                <FaGithub
                  className="text-4xl text-white bg-gray-500 p-2 rounded-full"
                  onClick={() => handleAuthenticate(githubProvider)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {isLoading ? (
                    <SmallLoader />
                  ) : (
                    <input type="submit" value="Login" className="text-base" />
                  )}
                </button>
              </div>
            </form>
            <p className=" text-center">
              New to Framework Peddler?{" "}
              <Link to={"/register"} className="text-orange-600 font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
