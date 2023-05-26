import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import { AdminAddUser } from "./AdminAddUser";
import AdminEdit from "./AdminEdit";
import LoginSuccess from "../LoginSuccess";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<LoginSuccess />}>
        <Route path="add-user" element={<AdminAddUser />} />
        <Route path="edit-user" element={<AdminEdit />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
