import React from 'react';
import { Route, Link } from 'react-router-dom';
import Mestologo from '../images/header/Mestologo.svg'

function Header({ userEmail, onLogout }) {

  return (
    <header className="header">
      <img className="header__logo"
        src={Mestologo}
        alt="логотип страницы"
      />
      <nav className="header__links">
      <p className="header__user-email">{userEmail}</p>
        <Route exact path="/">
          <Link
            to="/sign-in"
            className="header__logout"
            onClick={onLogout}>Выйти</Link>
        </Route>
        <Route path="/sign-in">
          <Link
            to="/sign-up"
            className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link
            to="/sign-in"
            className="header__link">Вход</Link>
        </Route>
      </nav>
    </header>
  );
};

export default Header;