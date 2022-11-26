import { useEffect, useState } from "react";

export const useToken = (email) => {
  const [token, setToken] = useState("");
  // console.log("user email", email);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("from useToken", data);
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};
