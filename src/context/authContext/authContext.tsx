import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../../@types/User.type";
import { auth } from "../../services/auth.service";
import { MyToken } from "../../@types/token.type";
import Swal from "sweetalert2";

type LayoutProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  userInfo: MyToken | null | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<MyToken | null | undefined>>;
  login: (user: UserType) => void;
  logout: () => void;
};

const defaultContextValue: AuthContextType = {
  token: null,
  setToken: () => null,
  userInfo: null,
  setUserInfo: () => null,
  login() {},
  logout() {},
};
export const AuthContext =
  React.createContext<Partial<AuthContextType>>(defaultContextValue);

const AuthProvider = ({ children }: LayoutProps) => {
  const [token, setToken] = useState<string | null | undefined>(null);
  const [userInfo, setUserInfo] = useState<MyToken | null | undefined>(null);
  const navigate = useNavigate();

  const login = async (user: UserType) => {
    const response = await auth(user);
    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      const decodedToken = jwtDecode<MyToken>(token);
      localStorage.setItem("userInfo", JSON.stringify(decodedToken));
      setUserInfo(decodedToken);
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Bienvenue, ${decodedToken.name || 'utilisateur'}!`,
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: 'Le mot de passe ou l\'email est incorrect',
      });
      console.log(response);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserInfo(null);
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    const user = localStorage.getItem("userInfo") as string;
    if (token) {
      setToken(token);
    }
    if (user) {
      const userInfoFromLocalStorage = JSON.parse(user) as MyToken;
      setUserInfo(userInfoFromLocalStorage);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ token, userInfo, login, logout, setToken, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
