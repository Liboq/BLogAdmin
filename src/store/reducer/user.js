import { GET_USER_TOKEN } from '../actionTypes/user'

const INITIAL_STATE = {
    userName:'',
  token: localStorage.getItem('pikachu-token')||null
}
export default function User (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_TOKEN:
        console.log(action,1222);
      return {
        ...state,
        token:action.value.token,
        userName:action.value.userName
      }
    default:
     return state
  }
}
