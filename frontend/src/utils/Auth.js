export const url = "https://anastasiyafitisova.nomoredomains.icu";

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject('Возникла ошибка');
  };
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkResult(res);
    });
};

export const authorize = ({ email, password }) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkResult(res);
    });
};

export const logout = () => {
  return fetch(`${url}/logout`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
  .then((res) => {
    return checkResult(res);
  });
};
