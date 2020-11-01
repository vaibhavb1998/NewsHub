import React, { useState, useEffect } from 'react'
import { Layout, Menu, Form, Input, Button, Select, Typography, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../style/adminNews.css'

const { Header, Sider, Content, Footer } = Layout;

const { Option } = Select;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AdminNews = () => {

  const [collapsed, setCollapsed] = useState(false)
  const [logoText, setLogoText] = useState("NewsHub")
  let history = useHistory();

  const toggle = () => {
    if (!collapsed) {
      setLogoText("NH")
    } else {
      setLogoText("NewsHub")
    }
    setCollapsed(!collapsed)
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);

    axios.post(`http://localhost:5000/api/admin/register/new-admin`, values)
      .then(res => {
        console.log(res)
        message.success("Admin added successfully");
        window.location.reload()
      })
      .catch(err => {
        message.error(err.response.data.msg);
        console.log(err)
      })
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {logoText}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          <Menu.Item key="1" icon={<FileSyncOutlined />} onClick={() => history.push('/admin/news')}>
            Manage News
          </Menu.Item>
          <Menu.Item key="2" icon={<FileAddOutlined />} onClick={() => history.push('/admin/add/news')}>
            Add News
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined />} onClick={() => history.push('/admin/add/user')}>
            Create New Admin
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Title level={2} style={{ marginBottom: "80px" }}>Create New Admin</Title>
          <Form {...layout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              name="name"
              label={
                <span>
                  Username
              </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input user username!',
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input size="large" placeholder="Enter user nickname" />
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
                  message: 'Please input user E-mail!',
                },
              ]}
              hasFeedback
            >
              <Input size="large" placeholder="Enter user email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input user password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || value.length > 7) {
                      return Promise.resolve();
                    }

                    return Promise.reject('Password must be atleast 8 characters');
                  },
                }),
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
                  message: 'Please confirm user password!',
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
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
        </Button> &nbsp;
              <Button htmlType="button" onClick={onReset}>
                Reset
        </Button>
            </Form.Item>
          </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; Copyright 2020 NewsHub</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminNews;
