import closePopup from "../images/close_icon.png";
import "../blocks/popup.css";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_generate" : ""
      }`}
    >
      <form
        className={`popup__container popup__form popup_type_${props.name}`}
        onSubmit={props.onSubmit}
        name={props.name}
      >
        <img
          src={closePopup}
          className="popup__close"
          alt="icono en tache para cerrar form"
          onClick={props.onClose}
        />
        <div>
          <img src={props.icon} alt="desc" className="popup__image-error" />
        </div>
        <h1 className="popup__title-error">{props.title}</h1>
      </form>
    </div>
  );
}

export default InfoTooltip;
