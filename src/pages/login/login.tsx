import React from 'react'
import Auth from '../../components/login/auth'
import "../../styles/auth.scss";

const LoginPage: React.FC= () => {
  return (
    <div className="auth">
      <Auth />
    </div>
  )
}

export default LoginPage
