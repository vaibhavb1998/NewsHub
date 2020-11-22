import React, { useState, useEffect } from 'react'
import { Layout, Menu, Form, Input, Button, Select, Radio, Typography, Upload, message, DatePicker } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  UploadOutlined,
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
  const [fileList, setFileList] = useState({})
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

  const onFinish = values => {
    console.log(values);

    values.files = fileList

    axios.post(`http://localhost:5000/api/admin/create/news`, values)
      .then(res => {
        console.log(res)
        message.success("News added successfully");
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
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
          <Title level={2} style={{ marginBottom: "80px" }}>Add News</Title>
          <Form {...layout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              name="name"
              label={<span>Title</span>}
              rules={[
                {

                  message: 'Please enter the news title!',
                  whitespace: true,
                },
              ]}
              hasFeedback
              required
            >
              <Input size="large" placeholder="Enter news title" />
            </Form.Item>

            <Form.Item
              name="author"
              label={<span>Author</span>}
              rules={[
                {

                  message: 'Please enter author name!',
                  whitespace: true,
                },
              ]}
              hasFeedback
              required
            >
              <Input size="large" placeholder="Enter author name" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              hasFeedback
              rules={[{ message: 'Please select news category!' }]}
              required
            >
              <Select size="large" placeholder="Select a category">
                <Option value="national">National</Option>
                <Option value="international">International</Option>
                <Option value="technology">Technology</Option>
                <Option value="politics">Politics</Option>
                <Option value="science">Science</Option>
                <Option value="devotional">Devotional</Option>
                <Option value="sports">Sports</Option>
                <Option value="others">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              hasFeedback
              required
              rules={[{ message: 'Please select news language!' }]}
            >
              <Radio.Group>
                <Radio value="english">English</Radio>
                <Radio value="hindi">Hindi</Radio>
                <Radio value="kannada">Kannada</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <span>
                  Description
              </span>
              }
              rules={[
                {

                  message: 'Please enter brief description!',
                  whitespace: true,
                },
              ]}
              required
            >
              <Input.TextArea size="large" placeholder="Enter brief description" rows="2" maxlength="80" />
            </Form.Item>

            <Form.Item
              name="content"
              label={
                <span>
                  Content
              </span>
              }
              rules={[
                {

                  message: 'Please enter news content!',
                  whitespace: true,
                },
              ]}
              required
            >
              <Input.TextArea defaultValue="content" size="large" placeholder="Enter news content" rows="8" maxlength="5000" />
            </Form.Item>

            <Form.Item label="DatePicker"
              required
              hasFeedback
              name="date"
            >
              <DatePicker size="large" format='DD/MM/YYYY' />
            </Form.Item>
            {/* 
            <Form.Item
              name"
              label={
                <span>
                  Image Url
              </span>
              }
              rules={[
                {
                  
                  message: 'Please enter image url!',
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input size="large" placeholder="Enter image url" />
            </Form.Item> */}

            <Form.Item
              name="image"
              label={<span>
                Image
                </span>
              }
              required
            >
              <Upload
                action="http://localhost:5000/api/admin/create/upload"
                listType="picture"
                accept=".png, .jpeg, .jpg"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
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
