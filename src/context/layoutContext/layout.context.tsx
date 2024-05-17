import React from "react";
import "../../styles/Navbar.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "../../components/navbar/navbar";

type LayoutProps = {
  children: React.ReactNode;
  token: string | null | undefined
};
export const LayoutContext = React.createContext({});

const LayoutProvider = ({ children, token }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{}}>
      {token ? <Navbar /> : null}
      <div style={{
        marginTop: token ? "80px" : "0"
      }}>{children}</div>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
