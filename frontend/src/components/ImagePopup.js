import closePopup from "../images/close_icon.png";

export default function ImagePopup({ link, title, onClose, isOpen }) {
  return (
    <div className={`popup-show  ${isOpen ? "popup_generate" : ""}`}>
      <div className="popup-show__container">
        <img
          src={closePopup}
          onClick={onClose}
          className="popup-show__close"
          alt="icono en tache para cerrar formulario para agregar fotos"
          id="close-show"
        />
        <img
          src={link}
          className="popup-show__add"
          alt="desc"
          id="image-picture"
        />
        <p className="popup-show__title-create">{title}</p>
      </div>
    </div>
  );
}
