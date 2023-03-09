import configStore from '../store';
export const hasPermission = (params)=>{
    const store = configStore()
    return  store.getState().Roles.role.includes(params)
}   