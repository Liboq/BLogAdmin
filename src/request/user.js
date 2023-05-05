
import request from "../utils/request"

export const getAllUser = ()=>{
    return request('get','user/getAllUser',{})
}
export const updateUserRole =(params)=>{
    return  request('post','user/updateUserRole',params)
}