import trashBtn from "../images/trash.png";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  _id,
  name,
  likes,
  link,
  onCardClick,
  card,
  onCardLike,
  onConfirmPopupClick,
  /*onCardDelete,*/
}) {
  const currentUser = useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = ` ${
    isOwn ? "gallery__trash" : "gallery__trash-hidden"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "gallery__like_active" : "gallery__like_desactive"
  }`;

  function handleLike() {
    onCardLike(card);
  }

  /*function handleDelete() {
    onCardDelete(card);
  }*/

  function handleConfirm() {
    onConfirmPopupClick(card);
  }

  return (
    <div className="gallery__item" key={_id}>
      <img
        src={trashBtn}
        alt="Bote de basura para eliminar una foto"
        className={cardDeleteButtonClassName}
        /*onClick={handleDelete}*/
        onClick={handleConfirm}
      />
      <img
        src={link}
        style={{ backgroundImage: `url(${link})` }}
        alt="desc"
        className="gallery__image"
        onClick={handleClick}
      />
      <div className="gallery__content-text">
        <h2 className="gallery__title-item">{name}</h2>
        <div className="gallery__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <span className="gallery__like-number">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
