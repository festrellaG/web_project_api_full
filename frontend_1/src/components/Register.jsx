import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import "../blocks/register.css";
import iconSuccess from "../images/iconSuccess.png";
import iconError from "../images/iconError.png";

const Register = () => {
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isInfoToolMessage, setIsInfoToolMessage] = useState({
    message: "",
    isError: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsInfoToolTipOpen(true);
    try {
      await signup(email, password);
      setIsInfoToolMessage({
        message: "¡Correcto! Ya estás registrado.",
        isError: false,
      });
    } catch (error) {
      console.error("Error with email or password:", error);
      setIsInfoToolMessage({
        message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        isError: true,
      });
    }
  }

  function closeInfoToolPopup() {
    setIsInfoToolTipOpen(false);
    navigate("/");
  }

  return (
    <div className="register-container">
      <h1 className="register-title">Regístrate</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          className="register-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          minLength={8}
          required
        />

        <button type="submit" className="register-button">
          Regístrate
        </button>
        <button className="register-text_btn" onClick={handleButtonClick}>
          ¿Ya eres miembro? Inicia sesión aquí
        </button>
      </form>
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        title={isInfoToolMessage.message}
        onClose={closeInfoToolPopup}
        name="infoToolTip"
        icon={isInfoToolMessage.isError ? iconError : iconSuccess}
      />
    </div>
  );
};

export default Register;
