import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import '../style/register.css'

import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
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

const Register = () => {
  let history = useHistory();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);

    axios.post(`http://localhost:5000/api/user/register`, values)
    .then(res => {
      console.log(res)
      history.push('/success')
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
    <div className="register-page">
      <Form
        {...formItemLayout}
        className="register-form"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
      <Form.Item
          name="name"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What name do you want to display on your profile?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input size="large" placeholder="Enter your nickname" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          hasFeedback
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button size="large" type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
          Already register? <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
