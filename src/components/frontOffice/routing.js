import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupCard from "../authentification/signUp";
import SentMailVerification from "../SentMailVerification";
import SignIn from "../authentification/SignIn";
import LoginSuccess from "../LoginSuccess";

const routing = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<SignupCard />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/mail-verif" element={<SentMailVerification />} />
    </Routes>
  );
};

export default routing;
