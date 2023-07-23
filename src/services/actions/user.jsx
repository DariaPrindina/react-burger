import {
  postEmail,
  postResetPassword,
  postUserRegister,
  postUserLogin,
  postUserLogout,
  postUserRefreshToken,
  getUserData,
  patchUserData
} from '../api/userApi'

export const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST'
export const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_REQUEST'
export const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_REQUEST'

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED'

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST'
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS'
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED'

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED'

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST' 
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS' 
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED' 

export const SET_USER_INFO_REQUEST = 'SET_USER_INFO_REQUEST'
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS'
export const SET_USER_INFO_FAILED = 'SET_USER_INFO_FAILED'


export const forgotPassword = (email) => dispatch => {
  dispatch({
    type: PASSWORD_FORGOT_REQUEST,
  })
  postEmail(email)
  .then(res => {
    dispatch({
      type: PASSWORD_FORGOT_SUCCESS,
    })
  })
  .catch(err => {
    dispatch({
      type: PASSWORD_FORGOT_FAILED,
    })
    console.log(err)
  })
}

export const resetPassword = (password, token) => dispatch => {
  dispatch({
    type: PASSWORD_RESET_REQUEST,
  })
  postResetPassword(password, token)
  .then(res => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      success: res.success,
      message: res.message,
    })
  })
  .catch(err => {
    dispatch({
      type: PASSWORD_RESET_FAILED,
      success: err.success,
      message: err.message,
    })
  })
}

export const registrationUser = (name, email, password) => dispatch => {
  dispatch({
    type: USER_REGISTRATION_REQUEST,
  })
  postUserRegister(name, email, password)
  .then(res => {
    dispatch({
      type: USER_REGISTRATION_SUCCESS,
      payload: res.user,
      token: res.accessToken,
    })
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
  })
  .catch(err => {
    dispatch({
      type: USER_REGISTRATION_FAILED,
      message: err.message,
    })
    console.log(err)
  })
}

export const loginUser = (email, password) => dispatch => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  })
  postUserLogin(email, password)
  .then(res => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.user,
      token: res.accessToken,
    })
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
  })
  .catch(err => {
    dispatch({
      type: USER_LOGIN_FAILED,
    })
    console.log(err)
  })
}

export const getUser = () => dispatch => {
  dispatch({
    type: GET_USER_INFO_REQUEST,
  })
  getUserData()
  .then(res => {
    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: res.user,
    })
  })
  .catch(err => {
    dispatch({
      type: GET_USER_INFO_FAILED,
    })
    console.log(err)
  })
}

export const setUser = (name, email, password) => dispatch => {
  dispatch({
    type: SET_USER_INFO_REQUEST,
  })
  patchUserData(name, email, password)
  .then(res => {
    dispatch({
      type: SET_USER_INFO_SUCCESS,
      payload: res.user,
    })
    console.log(res)
  })
  .catch(err => {
    dispatch({
      type: SET_USER_INFO_FAILED,
    })
    console.log(err)
  })
}

export const logoutUser = (token) => dispatch => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  })
  postUserLogout(token)
  .then(res => {
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: res,
    })
    localStorage.removeItem('refreshToken', res.refreshToken)
    localStorage.removeItem('accessToken', res.accessToken)
  })
  .catch(err => {
    dispatch({
      type: USER_LOGOUT_FAILED,
    })
    console.log(err)
  })
}

export const refreshTokenFunction = () => dispatch => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  })
  postUserRefreshToken()
  .then(res => {
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: res.accessToken,
    })
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
  })
  .catch(err => {
    dispatch({
      type: REFRESH_TOKEN_FAILED,
    })
    console.log(err)
  })
}








