// 无需权限认证的白名单

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
// 一般是前端的一些报错页
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../request/role';
import { getUserRole } from '../store/actions/role';
import usePermission from "../utils/hooks";
const AuthRoute = ({ children, pid }) => {
  // 该flag用于控制 受保护页面的渲染时机，需要等待useEffect中所有的权限验证条件完成后才表示可以渲染
  const [canRender, setRenderFlag] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch()
  const { hasPermission } = usePermission()

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
    // 用户未登录
    // 已登录
    // 已登录，根据后台传的权限列表做判断
    getRolelist()
    if (!hasPermission(+pid)) {
      navigate("/", { replace: true });
    }
    // 当上面的权限控制通过后，再渲染受保护的页面
    setRenderFlag(true);
  }, [location.pathname]);
  if (!canRender) return null;
  return children;
};
export default AuthRoute;