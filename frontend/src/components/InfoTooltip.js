import React from 'react';

function InfoToolTip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup popup_tooltip ${isOpen ? "popup_activated" : ""}`}>
      <div className="popup__content">
        <form className="popup__form">
          <div className={`popup__icon ${isSuccess ? "popup__icon_type_success" : "popup__icon_type_fail"}`}></div>
          <p className="popup__auth-text">
            {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть"
            onClick={onClose}>
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoToolTip;