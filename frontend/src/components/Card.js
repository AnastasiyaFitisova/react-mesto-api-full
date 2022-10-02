import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__del-button ${isOwn ? 'card__del-button_activated' : ''}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_activated' : ''}`);

  function handleCardClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <div className="card__image-container">
        <img className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
      </div>
      <div className="card__description">
        <h2 className="card__subtitle">{card.name}</h2>
        <div className="card__like-section">
          <button className={cardLikeButtonClassName}
            aria-label="Поставить лайк"
            type="button"
            onClick={handleLikeClick}>
          </button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        type="button"
        onClick={handleDeleteClick}>
      </button>
    </li>
  );
};

export default Card;