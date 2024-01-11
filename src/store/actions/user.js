
import { SET_USER_TOKEN, SET_USER_INFO, DEL_USER_INFO, DEL_USER_TOKEN } from '../actionTypes/user'

export const setUserToken = (value) => ({
  type: SET_USER_TOKEN,
  value
})
export const setUserInfo = (value) => ({
  type: SET_USER_INFO,
  value
})
export const delUserInfo = () => ({
  type: DEL_USER_INFO,
})
export const delUserToken = () => ({
  type: DEL_USER_TOKEN,
})