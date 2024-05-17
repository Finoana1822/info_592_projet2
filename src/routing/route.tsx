import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import PrivateRoutes from "../Utils/private-route";
import PublicRoutes from "../Utils/public-route";
import LoginPage from "../pages/login/login";

const Routing: React.FC = () => {
  return (
<Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/" />
        {/* <Route element={<NotFoundPage />} path="*" /> */}
        {/* mettre toutes les routes à protéger ici */}
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<LoginPage />} path="/login" />
      </Route>
    </Routes>
  );
};

export default Routing;
