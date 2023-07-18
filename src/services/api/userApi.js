import { apiUrl, checkResponse } from "./getIngredientsData";

export const postEmail = async (email) => {
  const res = await fetch(`${apiUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });
  return checkResponse(res);
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
  return checkResponse(res);
}

export const postUserRegister = async (email, password, name) => {
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
			password,
			name,
    })
  });
  return checkResponse(res)
}

export const postUserLogin = async (email, password) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
			password: password,
    })
  });
  return checkResponse(res);
}

export const postUserLogout = async () => {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    })
  });
  return checkResponse(res);
}

export const postUserRefreshToken = async () => {
  const res = await fetch(`${apiUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    })
  });
  return checkResponse(res);
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await postUserRefreshToken(); 
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserData = async () => {
  return fetchWithRefresh(`${apiUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
}

export const patchUserData = async (name, email, password) => {
  const res = await fetch(`${apiUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  });
  return checkResponse(res);
}



