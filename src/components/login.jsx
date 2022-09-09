import { useRequest } from "ahooks";
import React from "react";
import http from "../utils/request";

// 显示区
function ViewMd(props) {
  const regist = () => {
    const data = {
      userName: "xm",
      password: "1234567",
    };
    http("post", "/user/regist", data).then((res) => {
      console.log(res);
    });
  };
  const login = () => {
    const data = {
      userName: "xm",
      password: "123456",
    };
    http("post", "/user/login", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <button onClick={regist}>注册</button>
      <button onClick={login}>登陆</button>
    </div>
  );
}
export default ViewMd;
