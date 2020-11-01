import React, { useState, useEffect } from 'react'
import { Layout, Menu, Form, Button, Select, Typography, Skeleton, Dropdown, List, Modal } from 'antd';
import _, { set } from 'lodash'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  AlignRightOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios'

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

const UserNews = () => {

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('all-news')
  const [collapsed, setCollapsed] = useState(false)
  const [logoText, setLogoText] = useState("NewsHub")
  const [modalVisible, setModalVisible] = useState(false)
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

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/api/user/news?category=${category}`)
      .then(res => {
        setNews(res.data.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [category])

  const handleMenuClick = (e) => {
    console.log(e.key)
    setCategory(e.key)
  }

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const menu = (
    <Menu onClick={handleMenuClick} defaultActiveFirst>
      <Menu.Item key="all-news">
        <a target="_blank" >
          All News
      </a>
      </Menu.Item>
      <Menu.Item key="national">
        <a target="_blank" >
          National
      </a>
      </Menu.Item>
      <Menu.Item key="international">
        <a target="_blank" >
          International
      </a>
      </Menu.Item>
      <Menu.Item key="technology">
        <a target="_blank" >
          Technology
      </a>
      </Menu.Item>
      <Menu.Item key="science">
        <a target="_blank" >
          Science
      </a>
      </Menu.Item>
      <Menu.Item key="devotional">
        <a target="_blank" >
          Devotional
      </a>
      </Menu.Item>
      <Menu.Item key="sports">
        <a target="_blank" >
          Sports
      </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {logoText}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileSyncOutlined />} onClick={() => history.push('/user/news')}>
            News
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
          <Title level={2} style={{ marginBottom: "20px" }}>News</Title>
          <div>
            <Dropdown overlay={menu}>
              <Button style={{ marginBottom: "50px" }}>
                Select source <AlignRightOutlined />
              </Button>
            </Dropdown>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={news}
            className="list"
            renderItem={item => (
              <List.Item
                key={item.name}
                className="list-item"
                extra={
                  !loading && (
                    <img
                      width={272}
                      alt="logo"
                      src={item.imageUrl ? item.imageUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                    />
                  )
                }
              >
                <Skeleton loading={loading} active avatar>
                  <List.Item.Meta
                    title={<a href={item.url} target="_blank">{item.name}</a>}
                    description={item.description}
                  />
                  {item.content}
                </Skeleton>
                <br />
                <Button type="link" href={item.url} target="_blank">Click here to read...</Button>
              </List.Item>
            )}

          />
          <Modal
            title="20px to Top"
            style={{ top: 20 }}
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            okText="Close"
          >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
          </Modal>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; Copyright 2020 NewsHub</Footer>
      </Layout>
    </Layout >
  );
}

export default UserNews;
