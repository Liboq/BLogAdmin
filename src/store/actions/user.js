
import { GET_USER_TOKEN,GET_USER_INFO } from '../actionTypes/user'

export const getUserToken = (value) => ({
  type: GET_USER_TOKEN,
  value
})
export const getUserInfo = (value) => ({
  type: GET_USER_INFO,
  value
})