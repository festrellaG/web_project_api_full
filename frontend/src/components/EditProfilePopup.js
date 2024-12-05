import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Edita perfil"
      nameBtn="Guardar"
    >
      <input
        type="text"
        className="popup__name popup__input"
        id="input-name"
        minLength="2"
        maxLength="40"
        name="name"
        required
        placeholder="Nombre"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        className="popup__desc popup__input"
        id="input-desc"
        name="about"
        minLength="2"
        maxLength="200"
        required
        placeholder="Acerca de mí"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__error input-desc-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
