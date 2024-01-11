// 无需权限认证的白名单

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
// 一般是前端的一些报错页
import { useDispatch, useSelector } from 'react-redux';
import usePermission from "../utils/hooks";
const AuthRoute = ({ children, pid }) => {
  // 该flag用于控制 受保护页面的渲染时机，需要等待useEffect中所有的权限验证条件完成后才表示可以渲染
  const [canRender, setRenderFlag] = useState(false);
  const navigate = useNavigate();
  const { hasPermission } = usePermission()


  useEffect(() => {
    // 用户未登录
    // 已登录
    // 已登录，根据后台传的权限列表做判断

    if (!hasPermission(+pid)) {
      navigate("/layout", { replace: true });
    }
    // 当上面的权限控制通过后，再渲染受保护的页面
    setRenderFlag(true);
  }, [location.pathname]);
  if (!canRender) return null;
  return children;
};
export default AuthRoute;