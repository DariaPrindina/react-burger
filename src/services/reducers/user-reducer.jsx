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
} from '../actions/user'

const initialState = {
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

  token: '',

  user: {
    name: '',
    email: '',
    password: '',
  },

  isAuthChecked: false,
}

export const userReducer = (state = initialState, action) => {
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
        token: action.payload,
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
        user: action.payload,
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
        token: null,
        user: null,
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
        token: action.payload,
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
        user: action.payload,
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
        user: action.payload,
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