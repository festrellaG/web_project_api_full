import { useEffect, useState } from "react";
import { checkToken } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import imageLogo from "../images/logo_header.png";
import "../blocks/header.css";
import iconHamburger from "../images/hamburger_icon.png";
import iconClose from "../images/close_icon.png";

export default function Header({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isMainPage = location.pathname === "/main";
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMainPage) {
      async function fetchEmail() {
        try {
          const token = localStorage.getItem("jwt");
          const data = await checkToken(token);
          console.log(data);
          if (data) {
            setUserEmail(data.email);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchEmail();
    }
  }, [isMainPage]);

  let buttonText = "";
  if (isLoginPage) {
    buttonText = "Registrate";
  } else if (isRegisterPage) {
    buttonText = "Inicia sesión";
  } else if (isMainPage) {
    buttonText = "Cerrar sesión";
  }

  const handleButtonClick = () => {
    if (isLoginPage) {
      navigate("/register");
    } else if (isRegisterPage) {
      navigate("/");
    }
  };

  function handleButtonSessionClick() {
    if (isMainPage) {
      navigate("/");
      localStorage.removeItem("jwt");
      setUserEmail("");
      onLogout();
      setIsMenuOpen(false);
    }
  }

  function toggleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {isMenuOpen && (
        <div className="header__toggle-container">
          <span>{userEmail}</span>
          <span>
            <button
              className="header_btn-active"
              onClick={handleButtonSessionClick}
            >
              {buttonText}
            </button>
          </span>
        </div>
      )}

      <header className="header">
        <img
          src={imageLogo}
          alt="Logototipo de una Página iteractiva"
          className="header__logo"
          id="image-logo"
        />
        {isLoginPage || isRegisterPage ? (
          <button className="header_btn" onClick={handleButtonClick}>
            {buttonText}
          </button>
        ) : (
          <>
            <div className="header__container">
              <span>{userEmail}</span>
              <span>
                <button
                  className="header_btn-active"
                  onClick={handleButtonSessionClick}
                >
                  {buttonText}
                </button>
              </span>
            </div>
            <div className="header__hamburger">
              <img
                src={isMenuOpen ? iconClose : iconHamburger}
                onClick={toggleMenuClick}
                alt="Icon de menu"
                className="header__toggle-icon"
              ></img>
            </div>
          </>
        )}
      </header>
    </>
  );
}
