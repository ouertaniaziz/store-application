import React from "react";
import ClientHome from "./ClientHome";
import { Route,Routes } from "react-router-dom";
import ClientProducts from "./ClientProducts";
import ClientCart from "./ClientCart";
import ClientSettings from "./ClientSettings";
import LoginSuccess from "../LoginSuccess";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<LoginSuccess />}>
        <Route path="home" element={<ClientHome />} />
        <Route path="products" element={<ClientProducts />} />
        <Route path="cart" element={<ClientCart />} />
        <Route path="settings" element={<ClientSettings />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
