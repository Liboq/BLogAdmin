
import request from "../utils/request"

export const getUserIp = ()=>{
    return request('get','user/getUserIp',{})
}
