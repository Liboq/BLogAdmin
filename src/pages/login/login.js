import React, { useEffect } from "react";
import http from "../../utils/request";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo, setUserToken } from "../../store/actions/user";
import cookie from 'react-cookies'



// 显示区
function Login(props) {
  const state = useSelector(state => state)
  const dispath = useDispatch()
  let navigate = useNavigate();
  useEffect(() => {
    if (state.User.token) {
      navigate('/layout')
    }
  }, [])
  const login = (value) => {
    let expires = new Date(new Date().getTime() + 60 * 60 * 1000);//15分钟
    const data = {
      userName: value.userName,
      password: value.password,
    };
    http("post", "/user/login", data).then((res) => {
      if (res.status === 200) {
        message.success(res.message);
        cookie.save("pikachu-token", res.token, { httpOnly: false, expires });
        cookie.save("user-info", res.data.id, { httpOnly: false, expires })
        dispath(setUserToken({ token: res.token }))
        dispath(setUserInfo({ userName: value.userName, userId: res.data.id }))
        localStorage.setItem('userInfo', JSON.stringify({ userName: value.userName, role: res.data.role }))
        navigate("/layout");
      } else {
        message.error(res.message);
      }
    });
  };
  const finish = (value) => {
    login(value);
  };
  const finishFail = (err) => {
    message.error(err);
  };
  return (
    <div className="login-content">
      <h1 className="login-title">pikachu</h1>
      <div className="login-form">
        <Form
          name="normal-login"
          initialValues={{ remember: true }}
          onFinish={finish}
          onFinishFailed={finishFail}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            {/* Or <NavLink to="/user/regist">register now!</NavLink> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
