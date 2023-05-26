import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import { AdminAddUser } from "./AdminAddUser";
import AdminEdit from "./AdminEdit";
import LoginSuccess from "../LoginSuccess";
import AdminUsersManager from "./AdminUsersManager";
import AdminStoreManager from "./AdminStoreManager";
import AdminProductsManage from "./AdminProductsManage";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import AdminSettings from "./AdminSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<LoginSuccess />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="manage-users" element={<AdminUsersManager />}>
          <Route path="add-user" element={<AdminAddUser />} />
          <Route path="edit-user" element={<AdminEdit />} />
        </Route>
        <Route path="manage-products" element={<AdminProductsManage />}>
          <Route path="add-user" element={<AddProduct />} />
          <Route path="edit-user" element={<EditProduct />} />
        </Route>
        <Route path="manage-store" element={<AdminStoreManager />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
