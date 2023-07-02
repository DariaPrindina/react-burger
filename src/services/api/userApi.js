import { apiUrl, checkReponse } from "./getIngredientsData";

export const postEmail = async (email) => {
  const res = await fetch(`${apiUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  });
  return checkReponse(res);
}

export const postResetPassword = async (password, token) => {
  const res = await fetch(`${apiUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      token: token,
    })
  });
  return checkReponse(res);
}

export const postUserRegister = async (email, password, name) => {
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
			password: password,
			name: name,
    })
  });
  return checkReponse(res);
}


