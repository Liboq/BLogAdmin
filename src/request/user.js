
import request from "../utils/request"

export const getUserIp = async()=>{
    request('get','user/getUserIp',{}).then(res=>{
        return res
    })
}
