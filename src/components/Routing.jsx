import React, { Suspense } from "react";
import WithSubnavigation from "./NavBar/NavBar";
import { Routes, Route } from "react-router-dom";

const Routing = () => {
  const FrontOfficeRouting = React.lazy(() =>
    import("../components/frontOffice/routing")
  );
  return (
    <>
      <WithSubnavigation />
      <Suspense>
        <Routes>
          <Route path="/*" element={<FrontOfficeRouting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
