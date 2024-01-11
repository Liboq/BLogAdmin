import { SET_USER_TOKEN, SET_USER_INFO, DEL_USER_INFO, DEL_USER_TOKEN } from '../actionTypes/user'
import cookie from 'react-cookies'
const userName = (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).userName)
const INITIAL_STATE = {
  userName: userName || '游客',
  token: cookie.load('pikachu-token') || null,
  userId: cookie.load('user-info') || null,
}
export default function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.value.token,
      }
    case SET_USER_INFO:
      return {
        ...state,
        userName: action.value.userName,
        userId: action.value.userId
      }
    case DEL_USER_INFO:
      return {
        ...state,
        userName: "",
        userId: ""
      }
    case DEL_USER_TOKEN:
      return {
        ...state,
        token: ""
      }
    default:
      return state
  }
}
