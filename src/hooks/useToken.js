import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Authcontext } from "../contexts/AuthProvider";

export const useToken = (email) => {
  const { logOut } = useContext(Authcontext);
  const [token, setToken] = useState("");
  // console.log("user email", email);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("from useToken", data);
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          } else {
            // toast.error("Please create an account first");
            // logOut();
            // return;
          }
        });
    }
  }, [email]);
  return [token];
};
