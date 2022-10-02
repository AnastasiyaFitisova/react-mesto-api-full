import React from 'react';

function Login({ onLogin }) {
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
    onLogin({ email, password });
  };

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
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
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>

  )
};

export default Login;