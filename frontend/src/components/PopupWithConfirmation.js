import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete({
      card,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirmation"
      title="¿Estás seguro/a?"
      nameBtn="Si"
    ></PopupWithForm>
  );
}

export default PopupWithConfirmation;
