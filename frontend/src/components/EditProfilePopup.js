import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);


  function handleNameChange(evt) {
    setName(evt.target.value);
  };

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      name="correct-info"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-content">
        <input className="popup__input popup__input_type_name"
          id="input-name"
          type="text"
          name="name"
          placeholder="Имя пользователя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error"
          id="input-name-error">
        </span>
      </div>
      <div className="popup__input-content">
        <input className="popup__input popup__input_type_position"
          id="input-position"
          type="text"
          name="about"
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error"
          id="input-position-error">
        </span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;