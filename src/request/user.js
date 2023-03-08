
import request from "../utils/request"

export const getUserIp = ()=>{
    return request('get','user/getUserIp',{})
}
export const getAllUser = ()=>{
    return request('get','user/getAllUser',{})
}
