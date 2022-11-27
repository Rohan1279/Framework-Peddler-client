import React, { useEffect, useState } from "react";

const useUser = (email) => {
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsUser(data.isBuyer);
          setIsUserLoading(false);
        });
    }
  }, [email]);

  return [isUser, isUserLoading];
};

export default useUser;
