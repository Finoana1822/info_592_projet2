import React, { FormEvent, useState } from "react";
import logo from "../../assets/blockbuster1.png";
import AnimatedPage from "../../animation/transition";
import { UserState } from "../../context/authContext/authContext";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = UserState();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login!({ email, password });
  };

  return (
    <AnimatedPage>
      <div className="container h-100 bg">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={logo} className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      style={{ height: "40px" }}
                    >
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control input_user"
                    placeholder="email"
                    style={{ height: "40px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      style={{ height: "40px" }}
                    >
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control input_pass"
                    placeholder="mot de passe"
                    style={{ height: "40px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" className="btn login_btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Auth;
