
import React from "react";
import http from "../../utils/request";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import  './login.css'
import { NavLink } from "react-router-dom";

// 显示区
function Login(props) {
  
  const login = (value) => {
    const data = {
      userName: value.userName,
      password: value.password,
    };
    http("post", "/user/login", data).then((res) => {
      if(res.status === 200){
        console.log(res);
        message.success(res.message)
        localStorage.setItem('pikachu-token',JSON.stringify(res.token))
      }
      else{
        console.log(res);
        message.error(res.message)
      }

    });
  };
  const finish = (value) =>{
    console.log(value);
    login(value)
  }
  const finishFail = (err) => {
    message.error(err)
  }
  return (
    <div className="login-content">
      <div className="login-form">
        
<Form
      name="normal-login"
      initialValues={{ remember: true }}
      onFinish={finish}
      onFinishFailed={finishFail}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <NavLink to="/user/regist">register now!</NavLink>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
}
export default Login;
