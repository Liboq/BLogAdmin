import { GET_Roles} from '../actionTypes/role'
const INITIAL_STATE = {
    role:JSON.parse(localStorage.getItem('permission')).permission||[]
}
export default function Roles(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_Roles:
          return {
            ...state,
            role:action.value.role,
          }
         
        default:
         return state
      }

}