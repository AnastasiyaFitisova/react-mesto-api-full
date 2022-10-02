import React from 'react';

function PopupWithForm({ name, title, children, button, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_activated" : ""}`}>
      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit"
            className="popup__submit-button"
            aria-label="Сохранить/Подтвердить">{button}</button>
          <button type="button"
            className="popup__close-button"
            aria-label="Закрыть"
            onClick={onClose}>
          </button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;