import PopupWithForm from "./PopupWithForm";
import { createRef } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const titleRef = createRef();
  const linkRef = createRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
    titleRef.current.value = "";
    linkRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="place"
      title="Nuevo Lugar"
      nameBtn="Crear"
    >
      <input
        type="text"
        className="popup__name popup__input"
        id="input-place"
        name="title"
        placeholder="Titulo"
        minLength="2"
        maxLength="30"
        required
        ref={titleRef}
      />
      <span className="popup__error input-place-error"></span>
      <input
        type="url"
        className="popup__desc popup__input"
        id="input-link"
        name="link"
        placeholder="Enlace a la imagen"
        required
        ref={linkRef}
      />
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
  );
}
