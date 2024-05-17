import React from "react";
import "../../styles/Navbar.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "../../components/navbar/navbar";

type LayoutProps = {
  children: React.ReactNode;
  token: string | null | undefined;
};
export const LayoutContext = React.createContext({});

const LayoutProvider = ({ children, token }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{}}>
      <div className="wrapper">
        {token ? <Navbar /> : null}
        <div className="main p-3">{children}</div>
      </div>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
