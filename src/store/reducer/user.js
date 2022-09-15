import { GET_USER_TOKEN } from '../actionTypes/user'

const INITIAL_STATE = {
  token: localStorage.getItem('pikachu-token')||null
}
export default function User (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_TOKEN:
      return {
        ...state,
        token:action.value
      }
    default: return state
  }
}
