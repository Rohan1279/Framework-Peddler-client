import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
export const Authcontext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const createUser = (email, passoword) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passoword);
  };
  const updateUserProfile = (userInfo) => {
    console.log(userInfo);
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };
  const login = (email, passoword) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passoword);
  };
  const authenticateWithProvider = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    localStorage.removeItem("accessToken");
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    login,
    authenticateWithProvider,
    logOut,
  };

  return (
    <Authcontext.Provider value={authInfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
