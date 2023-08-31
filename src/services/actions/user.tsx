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
import {
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILED,

  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,

  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILED,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,

  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,

  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,

  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED
} from '../action-types/user-types'
import { AppDispatch, AppThunk } from '../types'
import { TOwner } from '../types/data';

export interface IPasswordForgotRequest {
  readonly type: typeof PASSWORD_FORGOT_REQUEST;
}
export interface IPasswordForgotSuccess {
  readonly type: typeof PASSWORD_FORGOT_SUCCESS,
  message: string;
  success: boolean;
}
export interface IPasswordForgotFailed {
  readonly type: typeof PASSWORD_FORGOT_FAILED;
}

export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS,
  message: string,
  success: boolean;
}
export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED,
  message: string,
  success: boolean;
}

export interface IUserRegistrationRequest {
  readonly type: typeof USER_REGISTRATION_REQUEST;
}
export interface IUserRegistrationSuccess {
  readonly type: typeof USER_REGISTRATION_SUCCESS,
  user: TOwner,
  token: string,
}
export interface IUserRegistrationFailed {
  readonly type: typeof USER_REGISTRATION_FAILED,
  message: string,
}

export interface IUserLoginRequest {
  readonly type: typeof USER_LOGIN_REQUEST;
}
export interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
  token: string,
  user: TOwner,
}
export interface IUserLoginFailed {
  readonly type: typeof USER_LOGIN_FAILED;
}

export interface IUserLogoutRequest {
  readonly type: typeof USER_LOGOUT_REQUEST;
}
export interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}
export interface IUserLogoutFailed {
  readonly type: typeof USER_LOGOUT_FAILED;
}

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS,
  token: string,
  user?: TOwner;
}
export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS,
  user: TOwner,
}
export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface ISetUserInfoRequest {
  readonly type: typeof SET_USER_INFO_REQUEST;
}
export interface ISetUserInfoSuccess {
  readonly type: typeof SET_USER_INFO_SUCCESS;
  user: TOwner,
}
export interface ISetUserInfoFailed {
  readonly type: typeof SET_USER_INFO_FAILED;
}

export type TUserActions =
  | IPasswordForgotRequest
  | IPasswordForgotSuccess
  | IPasswordForgotFailed
  | IPasswordResetRequest
  | IPasswordResetSuccess
  | IPasswordResetFailed
  | IUserRegistrationRequest
  | IUserRegistrationSuccess
  | IUserRegistrationFailed
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailed
  | IUserLogoutRequest
  | IUserLogoutSuccess
  | IUserLogoutFailed
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | ISetUserInfoRequest
  | ISetUserInfoSuccess
  | ISetUserInfoFailed;

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: PASSWORD_FORGOT_REQUEST,
  })
  postEmail(email)
  .then(res => {
    dispatch({
      type: PASSWORD_FORGOT_SUCCESS,
      message: res.message,
      success: res.success,
    })
  })
  .catch(err => {
    dispatch({
      type: PASSWORD_FORGOT_FAILED,
    })
    console.log(err)
  })
}

export const resetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: PASSWORD_RESET_REQUEST,
  })
  postResetPassword(password, token)
  .then(res => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      success: res?.success,
      message: res?.message,
    })
  })
  .catch(err => {
    dispatch({
      type: PASSWORD_RESET_FAILED,
      success: err?.success,
      message: err?.message,
    })
  })
}

export const registrationUser: AppThunk = (name, email, password) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_REGISTRATION_REQUEST,
  })
  postUserRegister(name, email, password)
  .then(res => {
    console.log(res)
    dispatch({
      type: USER_REGISTRATION_SUCCESS,
      user: res?.user,
      token: res?.accessToken,
    })
    localStorage.setItem('refreshToken', res?.refreshToken)
    localStorage.setItem('accessToken', res?.accessToken.split('Bearer ')[1])
  })
  .catch(err => {
    dispatch({
      type: USER_REGISTRATION_FAILED,
      message: err.message,
    })
    console.log(err)
  })
}

export const loginUser: AppThunk = (email, password) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  })
  postUserLogin(email, password)
  .then(res => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: res?.user,
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

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_INFO_REQUEST,
  })
  getUserData()
  .then(res => {
    dispatch({
      type: GET_USER_INFO_SUCCESS,
      user: res?.user,
    })
  })
  .catch(err => {
    dispatch({
      type: GET_USER_INFO_FAILED,
    })
    console.log(err)
  })
}

export const setUser: AppThunk = (name, email, password) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_INFO_REQUEST,
  })
  patchUserData(name, email, password)
  .then(res => {
    dispatch({
      type: SET_USER_INFO_SUCCESS,
      user: res?.user,
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

export const logoutUser: AppThunk = (token) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  })
  postUserLogout()
  .then(res => {
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    })
    console.log('logout res => ', res)
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  })
  .catch(err => {
    dispatch({
      type: USER_LOGOUT_FAILED,
    })
    console.log(err)
  })
}

export const refreshTokenFunction: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  })
  postUserRefreshToken()
  .then(res => {
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      token: res.accessToken,
      user: res.user,
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