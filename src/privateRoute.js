import React from 'react'
import { useSelector } from 'react-redux';
 
import {  Navigate,useLocation,Outlet } from 'react-router-dom'

 
 
function PrivateRoute({ children, ...rest }) {
    const location = useLocation();
    const state = useSelector(state=>state)
    //从仓库取数据
    var token = state.User.token
    const pathname = location.pathname;
    
    if(!token) return <Navigate state={{from:location}} to="/"/>
    if(token&&pathname ==='user/login') return <Navigate state={{from:location}} to='/layout' />
    return <Outlet />
}
 
 
export default PrivateRoute