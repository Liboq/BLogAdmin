import React from 'react'
 
import {  Navigate,useLocation,Outlet } from 'react-router-dom'
import configStore from './store';
const store = configStore()
 

 
 
function PrivateRoute({ children, ...rest }) {
    const location = useLocation();
 
    //从仓库取数据
    var token = store.getState().User.token
 
    if(!token) return <Navigate state={{from:location}} to="/"/>
    return <Outlet />
}
 
 
export default PrivateRoute