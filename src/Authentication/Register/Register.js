import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import { FaAppStore, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/getImageUrl";
import SmallLoader from "../../Components/SmallLoader";
import { Authcontext } from "../../contexts/AuthProvider";
import { useToken } from "../../hooks/useToken";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Register = () => {
  const { createUser, authenticateWithProvider, updateUserProfile } =
    useContext(Authcontext);
  const navigate = useNavigate();
  const [createUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createUserEmail);
  const [userRole, setUserRole] = useState("Buyer");
  const [isLoading, setIsLoading] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const buyerRef = useRef();
  const sellerRef = useRef();
  if (token) {
    console.log(token);
    navigate("/");
  }
  const [imgFile, setImgFile] = useState(null);

  const handleChange = (imgFile) => {
    setImgFile(imgFile);
  };
  console.log(imgFile);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // const image = e.target.image.files[0];
    // const formData = new FormData();
    // formData.append("image", image);
    // console.log(image);
    getImageUrl(imgFile).then((imgData) => {
      console.log(imgData);
      createUser(email, password)
        .then((result) => {
          console.log(result);
          const user = result.user;
          const userInfo = { displayName: name, photoURL: imgData };
          updateUserProfile(userInfo)
            .then(() => {
              saveUser(name, email, userRole);
            })
            .catch((err) => console.log(err));
          // console.log(user);
        })
        .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
        });
    });
  };
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => {
        console.log(err);
      });
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
          toast.success("Account created successfully");
          setIsLoading(false);
        }
        console.log(data);
      });
  };

  return (
    <div className="p-12 ">
      {/* <div className="sm:card  min-h-screen bg-base-200">
        <div className=" hero-content flex-col justify-center items-center mx-auto ">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Register now!</h1>
          </div>
          
        </div>
      </div> */}
      <div className="rounded-none  lg:flex max-w-[85rem]  mx-auto">
        <div className="my-auto bg-white">
          <img
            src="https://i.pinimg.com/originals/95/15/d8/9515d851ab5fc0373d062a9bfce76915.jpg"
            alt=""
            className="w-full"
          />
          <p className=" text-2xl text-center text-black p-4 font-bold leading-10">
            From your account Dashboard you can view your recent orders, Manage
            Your Shipping and Billing addresses and Edit your password and
            account details.
          </p>
        </div>

        <form onSubmit={handleRegister} className="card-body w-full">
          {/* image upload */}
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            children=<section class="flex flex-col w-full h-full p-1 overflow-auto">
              <header class="flex flex-col items-center justify-center py-12 text-base transition duration-500 ease-in-out transform bg-inherit border border-dashed rounded-lg text-blueGray-500 focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                <p class="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
                  <span>Drag and drop your</span>&nbsp;
                  <span>files anywhere or</span>
                </p>
                <button class="w-auto px-2 py-1 my-2 mr-2 transition duration-500 ease-in-out transform border rounded-md text-blueGray-500 hover:text-blueGray-600 text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-100">
                  Upload a file
                </button>

                {/* <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="mx-auto"
                required
              /> */}
              </header>
            </section>
          />
          <div className="form-control">
            <label className="input-group ">
              <span>Name</span>
              <input
                type="text"
                placeholder="your name"
                name="name"
                className="input input-bordered w-full"
                // required
              />
            </label>
          </div>
          <div className="">
            <div className="form-control pb-2 ">
              <label className="input-group rounded-none">
                <span className="label-text ">Email</span>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span className="label-text">Password</span>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
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
              className="text-4xl text-white bg-blue-400 p-2 rounded-full"
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
                <input type="submit" value="Register" className="text-base" />
              )}
            </button>
          </div>
          <p className=" text-center">
            Already a user?{" "}
            <Link to={"/login"} className="text-orange-600 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
