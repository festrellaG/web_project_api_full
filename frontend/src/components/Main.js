import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import editImageBtn from "../images/lapiz.png";
import editProfileBtn from "../images/edit_profile.png";
import addBtn from "../images/add_icon.png";
import "../blocks/profile.css";
import "../blocks/popup.css";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/");
      }
    }
    checkToken();
  }, [navigate]);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar}
            alt="Foto de perfil de un usuario que sube contenido de viajes"
            className="profile__face-image"
            id="image-profile"
          />
          <div
            className="profile__content-edit"
            id="image-content"
            onClick={props.onEditAvatarClick}
          >
            <img
              src={editImageBtn}
              alt="Logotipo de un lápiz para editar"
              className="profile__edit-pencil"
              id="image-edit-pencil"
            />
          </div>

          <div className="profile__data">
            <div className="profile__info">
              <h2 className="profile__name">{currentUser.name}</h2>
              <div
                className="profile__edit-data"
                onClick={props.onEditProfileClick}
              >
                <img
                  src={editProfileBtn}
                  alt="Botón en forma de lápiz que indica que se puede editar la información del perfil"
                  id="image-pencil"
                />
              </div>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-picture"
            onClick={props.onAddPlaceClick}
          >
            <img
              src={addBtn}
              alt="Botón en forma de signo de + que indica que se puede agregar fotos a su galeria"
              id="image-add"
            />
          </button>
        </div>
      </section>
      <div className="gallery">
        {props.cards.map((card) => (
          <Card
            onCardClick={props.onCardClick}
            card={card}
            key={card._id}
            name={card.name}
            likes={card.likes}
            link={card.link}
            onCardLike={props.onCardLike}
            onConfirmPopupClick={props.onConfirmPopupClick}
            /*onCardDelete={props.onCardDelete}*/
          />
        ))}
      </div>
    </main>
  );
}
