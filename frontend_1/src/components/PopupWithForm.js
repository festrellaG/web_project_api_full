import closePopup from "../images/close_icon.png";
import "../blocks/popup.css";

function PopupWithForm(props) {
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
        <h1 className="popup__title">{props.title}</h1>
        {props.children}
        <button className="popup__btn popup__button">{props.nameBtn}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
