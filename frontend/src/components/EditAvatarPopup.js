import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const inputLink = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputLink.current.value
    });
  };

  React.useEffect(() => {
    inputLink.current.value='';
  }, [isOpen]);

  return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          button="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_link"
              id="input-photolink"
              type="url"
              name="photolink"
              placeholder="Ссылка на изображение"
              required
              ref={inputLink}
            />
            <span className="popup__error"
              id="input-photolink-error">
            </span>
          </div>
        </PopupWithForm>
  );
};

export default EditAvatarPopup;