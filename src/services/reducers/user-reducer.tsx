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
import { TUserActions } from '../actions/user'

export type TUserReducerInitialState = {
  passwordForgotRequest: boolean,
  passwordForgotSuccess: boolean,
  passwordForgotFailed: boolean,

  passwordResetRequest: boolean,
  passwordResetSuccess: boolean,
  passwordResetFailed: boolean,
  
  registrationUserRequest: boolean,
  registrationUserSuccess: boolean,
  registrationUserFailed: boolean,

  userLoginRequest: boolean,
  userLoginSuccess: boolean,
  userLoginFailed: boolean,

  userLogoutRequest: boolean,
  userLogoutSuccess: boolean,
  userLogoutFailed: boolean,
  
  refreshTokenRequest: boolean,
  refreshTokenSuccess: boolean,
  refreshTokenFailed: boolean,
 
  getUserInfoRequest: boolean,
  getUserInfoSuccess: boolean,
  getUserInfoFailed: boolean,
  
  setUserInfoRequest: boolean,
  setUserInfoSuccess: boolean,
  setUserInfoFailed: boolean,
  
  sendTokenPasswordSuccess: boolean,
  sendTokenPasswordErrorMessage?: string,

  authentification: boolean,

  token?: string,

  message: string,
  success: boolean,

  user?: {
    name?: string,
    email?: string,
    password?: string,
  },

  isAuthChecked: boolean,
}

const initialState: TUserReducerInitialState = {
  passwordForgotRequest: false,
  passwordForgotSuccess: false,
  passwordForgotFailed: false,

  passwordResetRequest: false,
  passwordResetSuccess: false,
  passwordResetFailed: false,
  
  registrationUserRequest: false,
  registrationUserSuccess: false,
  registrationUserFailed: false,

  userLoginRequest: false,
  userLoginSuccess: false,
  userLoginFailed: false,

  userLogoutRequest: false,
  userLogoutSuccess: false,
  userLogoutFailed: false,
  
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: false,
 
  getUserInfoRequest: false,
  getUserInfoSuccess: false,
  getUserInfoFailed: false,
  
  setUserInfoRequest: false,
  setUserInfoSuccess: false,
  setUserInfoFailed: false,
  
  sendTokenPasswordSuccess: false,
  sendTokenPasswordErrorMessage: '',

  authentification: false,

  message: '',
  success: false,

  token: '',

  user: {
    name: '',
    email: '',
    password: '',
  },

  isAuthChecked: false,
}

export const userReducer = (
  state = initialState, 
  action: TUserActions
  ) => {
  switch (action.type) {
    case PASSWORD_FORGOT_REQUEST: {
      return {
        ...state,
        passwordForgotRequest: true,
        passwordForgotSuccess: false,
        passwordForgotFailed: false,
      }
    }
    case PASSWORD_FORGOT_SUCCESS: {
      return {
        ...state,
        passwordForgotRequest: false,
        passwordForgotSuccess: true,
        passwordForgotFailed: false,
        message: action.message,
        success: action.success,
      }
    }
    case PASSWORD_FORGOT_FAILED: {
      return {
        ...state,
        passwordForgotRequest: false,
        passwordForgotSuccess: false,
        passwordForgotFailed: true,
      }
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetSuccess: false,
        passwordResetFailed: false,
      }
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true,
        passwordResetFailed: false,
        message: action.message,
        success: action.success,
      }
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: false,
        passwordResetFailed: true,
        sendTokenPasswordSuccess: action.success,
        sendTokenPasswordErrorMessage: action.message,
      }
    }
    case USER_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationUserRequest: true,
        registrationUserSuccess: false,
        registrationUserFailed: false,
      }
    }
    case USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationUserRequest: false,
        registrationUserSuccess: true,
        registrationUserFailed: false,
        token: action.token,
        user: action.user,
        authentification: true,
        isAuthChecked: true,
      }
    }
    case USER_REGISTRATION_FAILED: {
      return {
        ...state,
        registrationUserRequest: false,
        registrationUserSuccess: false,
        registrationUserFailed: true,
        message: action.message,
      }
    }
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        userLoginRequest: true,
        userLoginSuccess: false,
        userLoginFailed: false,
      }
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userLoginRequest: false,
        userLoginSuccess: true,
        userLoginFailed: false,
        token: action.token,
        user: action.user,
        authentification: true,
        isAuthChecked: true,
      }
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        userLoginRequest: false,
        userLoginSuccess: false,
        userLoginFailed: true,
      }
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        userLogoutRequest: true,
        userLogoutSuccess: false,
        userLogoutFailed: false,
      }
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        userLogoutRequest: false,
        userLogoutSuccess: true,
        userLogoutFailed: false,
        token: undefined,
        user: undefined,
        authentification: false,
        isAuthChecked: false,
      }
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        userLogoutRequest: false,
        userLogoutSuccess: false,
        userLogoutFailed: true,
      }
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenSuccess: false,
        refreshTokenFailed: false,
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenSuccess: true,
        refreshTokenFailed: false,
        token: action.token,
        user: action.user,
        authentification: true,
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenSuccess: false,
        refreshTokenFailed: true,
        authentification: false,
      }
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        getUserInfoRequest: true,
        getUserInfoSuccess: false,
        getUserInfoFailed: false,
      }
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoSuccess: true,
        getUserInfoFailed: false,
        user: action.user,
        authentification: true,
        isAuthChecked: true,
      }
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoSuccess: false,
        getUserInfoFailed: true,
        authentification: false,
        isAuthChecked: true,
      }
    }
    case SET_USER_INFO_REQUEST: {
      return {
        ...state,
        setUserInfoRequest: true,
        setUserInfoSuccess: false,
        setUserInfoFailed: false,
      }
    }
    case SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        setUserInfoRequest: false,
        setUserInfoSuccess: true,
        setUserInfoFailed: false,
        user: action.user,
      }
    }
    case SET_USER_INFO_FAILED: {
      return {
        ...state,
        setUserInfoRequest: false,
        setUserInfoSuccess: false,
        setUserInfoFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}