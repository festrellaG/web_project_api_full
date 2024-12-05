import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import "../blocks/login.css";
import iconError from "../images/iconError.png";

const Login = ({ handleLoggin }) => {
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/register");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signin(email, password).then(() => {
        handleLoggin();
        navigate("/main");
      });
    } catch (error) {
      console.error("Error with email or password:", error);
      setIsInfoToolTipOpen(true);
    }
  }

  function closeInfoToolPopup() {
    setIsInfoToolTipOpen(false);
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Inicia sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit" className="login-button">
          Inicia sesión
        </button>
        <button className="login-text_btn" onClick={handleButtonClick}>
          ¿Aún no eres miembro? Regístrate aquí
        </button>
      </form>
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        title="Uy, algo salió mal. Por favor,  intentalo de nuevo."
        onClose={closeInfoToolPopup}
        name="infoToolTip"
        icon={iconError}
      />
    </div>
  );
};

export default Login;
