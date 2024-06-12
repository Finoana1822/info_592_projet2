import React, { FormEvent, useRef, useState } from "react";
import logo from "../../assets/ebf4e287948865.5dc7ddb72cb74.gif";
import AnimatedPage from "../../animation/transition";
import { UserState } from "../../context/authContext/authContext";
import { jwtDecode } from "jwt-decode";
import { MyToken } from "../../@types/token.type";

type AuthProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const Auth: React.FC<AuthProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginButton = useRef<HTMLButtonElement | null>(null);
  const { setToken, setUserInfo, login } = UserState();

  //fonction simulée
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.setIsLoading(true);
    setTimeout(() => {
      props.setIsLoading(false);
      const fakeToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldmludGhpZXJyeXJAZ21haWwuY29tIiwiaWQiOjQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTkzMzU0N30.SIE2wgfZMbeFg7PzoEqDo3BC84OtK9poqf-_usSg9BI";
      localStorage.setItem("token", fakeToken);
      if (setToken) setToken(fakeToken);
      const decodedToken = jwtDecode<MyToken>(fakeToken);
      localStorage.setItem("userInfo", JSON.stringify(decodedToken));
      if (setUserInfo) setUserInfo(decodedToken);
    }, 3000);
    // login!({ email, password });
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   props.setIsLoading(true);
  //   try {
  //     await login!({ email, password });
  //   } catch (error) {
  //     console.error('Erreur lors de la connexion:', error);
  //     alert('Échec de la connexion. Veuillez vérifier vos identifiants.');
  //   } finally {
  //     props.setIsLoading(false);
  //   }
  // };

  return (
    <AnimatedPage>
      <div
        style={{ minHeight: "90vh" }}
        className="container d-flex justify-content-center align-items-center"
      >
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{
              backgroundColor: "#1f0849",
            }}
          >
            <div className="featured-image mb-3">
              <img
                src={logo}
                className="img-fluid"
                style={{
                  width: "250px",
                }}
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily:
                  "font-family: 'Courier New', Courier, monospace; font-weight: 600",
              }}
            >
              Authentifiez-vous
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "Courier New', Courier, monospace",
              }}
            >
              Gérer tous les contenus de votre entreprise
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4 text-center">
                <h2>Bienvenu</h2>
                <p>Bon retourn parmis nous</p>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <button
                  ref={loginButton}
                  className="btn btn-lg w-100 fs-6 login-button"
                  onClick={handleSubmit}
                  style={{
                    background: "#6349e3",
                  }}
                  onMouseEnter={() => {
                    if (loginButton.current)
                      loginButton.current.style.backgroundColor = "#4d34ca";
                  }}
                  onMouseLeave={() => {
                    if (loginButton.current)
                      loginButton.current.style.backgroundColor = "#6349e3";
                  }}
                >
                  Login
                </button>
              </div>
              {/* <div className="row">
              <small>
                Don't have account? <a href="#">Sign Up</a>
              </small>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Auth;
