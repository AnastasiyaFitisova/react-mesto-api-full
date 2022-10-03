import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
/* import PopupWithForm from './PopupWithForm.js'; */
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import * as auth from '../utils/Auth.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoToolTip from './InfoTooltip.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(null);

  //загрузка карточек с сервера
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards() 
        .then((res) => {
          setLoggedIn(true);
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  //лайк и дизлайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаление карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((d) => d._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //открытие и закрытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);
  };

  //загрузка информации о пользователе
  React.useEffect(() => {
      api.getUserInfo()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          setEmail(res.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
  }, [loggedIn, history]);

  //корректировка информации профиля
  function handleUpdateUser(data) {
    api.correctUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //изменение аватара
  function handleUpdateAvatar(data) {
    api.changeUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //вход и регистрация, выход
  const onLogin = (data) => {
    return auth.authorize(data)
      .then(({ token }) => {
        if({token}) {
        setLoggedIn(true);
        setEmail(data.email);
        history.push("/");
      }
    })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
      })
  };

  const onRegister = (data) => {
    return auth.register(data)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipPopupOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
      })
  };

  const onLogout = () => {
    return auth.logout()
    .then(() => {
      setLoggedIn(false);
      history.push('/sign-in');
      setEmail("");
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header
          userEmail={email}
          onLogout={onLogout} />

        <Switch>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />

          <Route path="/sign-up">
            <Register
              onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={onLogin} />
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit} />

        <InfoToolTip
          isOpen={isTooltipPopupOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups} />

      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
