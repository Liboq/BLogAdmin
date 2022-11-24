import request from "../utils/request"
export const getAllMes = ()=>{
    return request('get','message/getAllMes')
}
export const delMessage = (params)=>{
    return request('post','message/delMessage',params)
}