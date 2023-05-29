import React, { Suspense, useState, useEffect } from "react";
import WithSubnavigation from "./NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import SimpleSidebar from "./sidebar/Sidebar";
import { auth } from "../config/firebase";
import NotFound from "./NotFound";

const Routing = () => {
  const [isConnected, setisConnected] = useState(false);
  const FrontOfficeRouting = React.lazy(() =>
    import("../components/frontOffice/routing")
  );
  const AdminRouting = React.lazy(() =>
    import("../components/adminComponent/AdminRoutes")
  );
  const ClientRouting = React.lazy(() =>
    import("../components/clientComponent/ClientRoutes")
  );
  const SellerRouting = React.lazy(() =>
    import("../components/sellerComponent/SellerRoutes")
  );
  const [admin, setAdmin] = useState(false);
  const [client, setClient] = useState(false);
  const [seller, setSeller] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setisConnected(true);
      if (JSON.parse(localStorage.getItem("user")).role === "Admin") {
        setAdmin(true);
      } else if (JSON.parse(localStorage.getItem("user")).role === "Client") {
        setClient(true);
      } else {
        setSeller(true);
      }
    }
  }, []);

  return (
    <>
      {localStorage.getItem("user") ? (
        <SimpleSidebar>
          <Suspense>
            <Routes>
              {admin && <Route path="Admin/*" element={<AdminRouting />} />}
              {client && <Route path="Client/*" element={<ClientRouting />} />}
              {seller && <Route path="Seller/*" element={<SellerRouting />} />}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SimpleSidebar>
      ) : (
        <WithSubnavigation />
      )}
      <Suspense>
        <Routes>
          <Route path="/*" element={<FrontOfficeRouting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
