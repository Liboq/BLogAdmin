import { Button, Form, Input, message, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/request";
import "./regist.css";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Regist = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const regist = (values) => {
    console.log("Received values of form: ", values);
    const { userName, password, phone } = values;
    const data = {
      userName,
      password,
      phone,
    };
    http("post", "/user/regist", data).then((res) => {
      if (res.status === 200) {
        message.success(res.message);
        navigate("/user/login");
      } else {
        console.log(res);
        message.error(res.message);
      }
      console.log(res);
    });
  };

  const onFinish = (values) => {
    regist(values);
  };

  const finishFail = (err) => {
    message.error(err);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="regist-content">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={finishFail}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="userName"
          label="userName"
          rules={[
            {
              required: true,
              message: "Please input your userName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              len: 11,
              message: "please input current phone number",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            maxLength="11"
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Regist;
