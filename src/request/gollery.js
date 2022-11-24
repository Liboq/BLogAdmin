import request from "../utils/request"
export const getAllGollery =  ()=> {
   return  request('get','gollery/getAllGollery')
}
/* 
    params:_id
*/
export const getOneGollery =  (params)=> {
  return  request('get','gollery/getOneGollery',params)
}
/* 
/* 
params:all
*/
export const createGollery = (params)=> {
   return  request('post','gollery/createGollery',params)
}
/*
params:_id 
 */
export const delGollery =  (params)=> {
   return  request('post','gollery/delGollery',params)
}
/*
params:all 
 */
export const updateGollery =  (params)=> {
   return  request('post','gollery/updateGollery',params)
}