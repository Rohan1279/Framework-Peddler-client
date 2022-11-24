import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Authcontext } from "../../contexts/AuthProvider";

const ErrorPage = () => {
  const error = useRouteError();
  const { logOut } = useContext(Authcontext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully!");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="flex items-center h-full p-16 ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            {/* <span className="sr-only">{error.statusText}</span>
            {error.message} */}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link rel="noopener noreferrer" to={"/"}>
            <button className="btn btn-primary">Back to homepage</button>
          </Link>
          <div className="divider">Or</div>
          <p>
            <button
              className="btn btn-primary btn-xs mx-3"
              onClick={handleLogOut}
            >
              Sign Out
            </button>
            and Sign in again
          </p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
