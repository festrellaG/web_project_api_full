import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = createRef();
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);

    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Cambiar foto de perfil"
      nameBtn="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__desc popup__input"
        id="input-url"
        name="url"
        placeholder="Enlace a la imagen"
        ref={inputRef}
        required
      />
      <span className="popup__error input-url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
