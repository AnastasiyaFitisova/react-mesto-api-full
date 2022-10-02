import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onUpdatePlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handlePlaceNameAdd(evt) {
    setName(evt.target.value);
  };

  function handlePlaceLinkAdd(evt) {
    setLink(evt.target.value);
  };
 
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdatePlace({name, link});
  };

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-content">
        <input className="popup__input popup__input_type_place"
          id="input-place"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handlePlaceNameAdd}
        />
        <span className="popup__error"
          id="input-place-error">
        </span>
      </div>
      <div className="popup__input-content">
        <input className="popup__input popup__input_type_link"
          id="input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handlePlaceLinkAdd}
        />
        <span className="popup__error"
          id="input-link-error">
        </span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;