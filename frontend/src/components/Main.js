import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar"
            src={currentUser?.avatar}
            alt="фото профиля"
          />
          <div className="profile__overlay"
            onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button className="profile__set-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__position">{currentUser?.about}</p>
        </div>
        <button className="profile__add-button"
          aria-label="Добавить место"
          type="button"
          onClick={onAddPlace}>
        </button>
      </section>


      <section className="elements">
        <ul className="elements__cardholder">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          }
          )}
        </ul>
      </section>

    </main>
  );
};

export default Main;