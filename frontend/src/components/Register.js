import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  };

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  };

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form
        className="auth__form"
        onSubmit={handleSubmit}>
        <input className="auth__input"
          type="email"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="auth__button">Зарегистрироваться</button>
      </form>
      <div className="auth__signin">
        <p className="auth__signin-question">Уже зарегистрированы?&nbsp;<Link to="/" className="auth__link">Войти</Link></p>
      </div>
    </div>
  );
};

export default Register;