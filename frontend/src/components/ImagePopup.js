import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_img-view ${card ? "popup_activated" : ""}`}>
      <div className="popup__container">
        <img className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__place-description">{card ? card.name : ""}</p>
        <button type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}>
          </button>
      </div>
    </div>
  );
};

export default ImagePopup;