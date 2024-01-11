import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { getRoles } from './request/role';
import { getUserRole } from './store/actions/role';



function PrivateRoute({ children, ...rest }) {
    const dispath = useDispatch()
    const location = useLocation();
    const state = useSelector(state => state)
    //从仓库取数据
    var token = state.User.token
    const pathname = location.pathname;
    const getRolelist = async () => {
        const res = await getRoles()
        console.log(res);
        const role = JSON.parse(localStorage.getItem('userInfo')).role
        const hasRole = res.data.filter(roleitem => {
            return role.includes(roleitem.name)
        }).map(item => item.permission)
        let curPermission = []

        hasRole.forEach(item => {
            item.forEach(item1 => {
                if (!curPermission.includes(item1)) {
                    curPermission.push(item1)
                }
            })
        })
        dispath(getUserRole({ role: curPermission }))
    }
    useEffect(() => {
        getRolelist()
    }, [location.pathname])
    if (!token) return <Navigate state={{ from: location }} to="/" />
    if (token && (pathname === 'user/login' || pathname === "/")) return <Navigate state={{ from: location }} to='/layout' />
    return <Outlet />
}


export default PrivateRoute