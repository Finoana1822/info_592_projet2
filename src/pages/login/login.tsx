import React, { useState } from "react";
import Auth from "../../components/login/auth";
import "../../styles/auth.scss";
import Spinner from "../../Utils/spinner";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isLoading && <Spinner />}
      <Auth setIsLoading={setIsLoading} />
    </>
  );
};

export default LoginPage;
