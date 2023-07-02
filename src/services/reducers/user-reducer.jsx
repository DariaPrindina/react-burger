import {
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
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


  user: null,
  message: '',
}

export const UserReducer = (state = initialState, action) => {
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
      }
    }

    default: {
      return state;
    }
  }
}