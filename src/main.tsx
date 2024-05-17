import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AOSInit } from "./components/aos/aos-init";
import { Providers } from "./redux/provider";
import App from "./App";
import AuthProvider from "./context/authContext/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AOSInit />
    <Router>
      <AuthProvider>
        <Providers>
          <App />
        </Providers>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
