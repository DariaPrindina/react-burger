import {
  postEmail,
  postResetPassword,
  postUserRegister
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

export const forgotPassword = (email) => dispatch => {
  dispatch({
    type: PASSWORD_FORGOT_REQUEST,
  })
  postEmail(email)
  .then(res => {
    dispatch({
      type: PASSWORD_FORGOT_SUCCESS,
      payload: res.message,
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
    })
  })
  .catch(err => {
    dispatch({
      type: PASSWORD_RESET_FAILED,
    })
    console.log(err)
  })
}

export const registrationUser = (email, password, name) => dispatch => {
  dispatch({
    type: USER_REGISTRATION_REQUEST,
  })
  postUserRegister(email, password, name)
  .then(res => {
    dispatch({
      type: USER_REGISTRATION_SUCCESS,
      payload: res.accessToken,
    })
    
  })
  .catch(err => {
    dispatch({
      type: USER_REGISTRATION_FAILED,
    })
    console.log(err)
  })
}