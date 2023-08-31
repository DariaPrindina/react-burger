import { TUserLogoutRes, TUserRes } from "../types/data";
import { apiUrl, checkResponse } from "./getIngredientsData";

export const postEmail = async (email: string) => {
  const res = await fetch(`${apiUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });
  return checkResponse<TUserRes>(res);
}

export const postResetPassword = async (password: string, token: string) => {
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
  return checkResponse<TUserRes>(res);
}

export const postUserRegister = async (email: string, password: string, name: string) => {
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
  return checkResponse<TUserRes>(res)
}

export const postUserLogin = async (email: string, password: string) => {
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
  return checkResponse<TUserRes>(res);
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
  return checkResponse<TUserLogoutRes>(res);
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
  return checkResponse<TUserRes>(res);
}

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<TUserRes>(res);
  } catch (err: any) {
    if (err.message === "jwt expired" || 'invalid token') {
      const refreshData = await postUserRefreshToken(); 
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse<TUserRes>(res);
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

export const patchUserData = async (name: string, email: string, password: string) => {
  return fetchWithRefresh(`${apiUrl}/auth/user`, {
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
}



