import { GET_USER_TOKEN ,GET_USER_INFO} from '../actionTypes/user'
import cookie from 'react-cookies'
console.log(cookie.load('pikachu-token'),'token');
const userName =  (localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo')).userName)
const INITIAL_STATE = {
  userName:userName||'123',
  token: cookie.load('pikachu-token')||null,
  userId:cookie.load('user-info')||null,
}
export default function User (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_TOKEN:
        console.log(action,1222);
      return {
        ...state,
        token:action.value.token,
      }
      case GET_USER_INFO:
        console.log(action,1223);
      return {
        ...state,
        userName:action.value.userName,
        userId:action.value.userId
      }
    default:
     return state
  }
}
