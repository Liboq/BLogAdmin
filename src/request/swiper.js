import request from "../utils/request"
export const getAllSwiper = ()=> {
    return request('get','swiper/getAllSwiper')
}

export const updateSwiper = (params)=> {
    return request('post','swiper/updateSwiper',params)
}