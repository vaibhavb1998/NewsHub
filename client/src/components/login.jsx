import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import '../style/login.css'

const Login = () => {
  let history = useHistory();

  const onFinish = values => {
    // console.log('Received values of form: ', values);

    axios.post(`http://localhost:5000/api/user/login`, values)
    .then(res => {
      // console.log(res)
      message.success('Login Successful!!!');
      history.push('/')
    })
    .catch(err => {
      // console.log(err.response.data.msg)
      message.error(err.response.data.msg);
    })
  };

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input 
            size="large"
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

        <Form.Item className="login-btn">
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
