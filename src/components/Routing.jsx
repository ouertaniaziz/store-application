import React, { Suspense, useState, useEffect } from "react";
import WithSubnavigation from "./NavBar/NavBar";
import { Routes, Route } from "react-router-dom";

const Routing = () => {
  const [isConnected, setisConnected] = useState(false);
  const FrontOfficeRouting = React.lazy(() =>
    import("../components/frontOffice/routing")
  );
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setisConnected(true);
    }
  }, [localStorage.getItem("user")]);

  return (
    <>
      {!isConnected ? <WithSubnavigation /> : null}

      <Suspense>
        <Routes>
          <Route path="/*" element={<FrontOfficeRouting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
