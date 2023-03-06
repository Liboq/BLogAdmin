import request from "../utils/request"
export const getRoles = ()=>{
    return request('get','role/getRoles')
}
export const updateRole = (params)=>{
    return request('post','role/updateRole',params)
}
export const delRole = (params)=>{
    return request('post','role/delRole',params)
}
export const addRole = (params)=>{
    return request('post','role/addRole',params)
}