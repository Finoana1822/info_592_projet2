import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../../@types/User.type";
import { auth } from "../../services/auth.service";

type LayoutProps = {
  children: React.ReactNode;
};

type MyToken = {
  email: string;
  id: number;
  role: string;
  iat: number;
};

type AuthContextType = {
  token: string | null | undefined;
  userInfo: MyToken | null | undefined;
  login: (user: UserType) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<Partial<AuthContextType>>({});

const AuthProvider = ({ children }: LayoutProps) => {
  const [token, setToken] = useState<string | null | undefined>(null);
  const [userInfo, setUserInfo] = useState<MyToken | null | undefined>(null);
  const navigate = useNavigate();

  const login = async (user: UserType) => {
    const response = await auth(user);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.access_token);
      setToken(response.data.access_token);
      const decodedToken = jwtDecode<MyToken>(response.data.access_token);
      localStorage.setItem("userInfo", JSON.stringify(decodedToken));
      setUserInfo(decodedToken);
      navigate("/");
    } else {
      //besoin d'un pop-up
      alert(`Le mot de passe ou l'email est incorrect`);
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
    <AuthContext.Provider value={{ token, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
