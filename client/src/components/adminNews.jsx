import React, { useState, useEffect } from 'react'
import { Layout, Menu, Form, Button, Select, Typography, Card, Image, Dropdown, List, Modal, message, DatePicker } from 'antd';
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
import '../style/userNews.css'

const { Header, Sider, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const AdminNews = (props) => {

  const [news, setNews] = useState([])
  const [category, setCategory] = useState('all-news')
  const [language, setLanguage] = useState('english')
  const [date, setDate] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const [logoText, setLogoText] = useState("NewsHub")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({})
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
    axios.get(`http://localhost:5000/api/user/news?category=${category}&language=${language}&date=${date}`)
      .then(res => {
        setNews(res.data.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [category, language, date])

  const handleCategoryChange = (e) => {
    console.log(e.key)
    setCategory(e.key)
  }

  const handleLanguageChange = (e) => {
    console.log(e.key)
    setLanguage(e.key)
  }

  const handleDateChange = (value, dateString) => {
    setDate(value)
  }

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const categoryMenu = (
    <Menu onClick={handleCategoryChange} defaultActiveFirst>
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
      <Menu.Item key="politics">
        <a target="_blank" >
          Politics
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

  const languageMenu = (
    <Menu onClick={handleLanguageChange} defaultActiveFirst>
      <Menu.Item key="english">
        <a target="_blank" >
          English
      </a>
      </Menu.Item>
      <Menu.Item key="hindi">
        <a target="_blank" >
          Hindi
      </a>
      </Menu.Item>
      <Menu.Item key="kannada">
        <a target="_blank" >
          Kannada
      </a>
      </Menu.Item>
    </Menu>
  );

  const handleNewsClick = () => {
    console.log('here 5', modalData)
    props.history.push('/news', {
      newsData: modalData,
    })
  }

  const handleNewsDelete = () => {
    if (!_.isEmpty(modalData)) {
      axios.delete(`http://localhost:5000/api/admin/delete/news?newsId=${modalData._id}`)
        .then(res => {
          message.success("News deleted successfully")
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
          message.error("Some error happened")
        })
    }
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {logoText}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
          <Title level={2} style={{ marginBottom: "20px" }}>News</Title>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Dropdown overlay={categoryMenu}>
              <Button style={{ marginBottom: "50px" }}>
                Select category <AlignRightOutlined />
              </Button>
            </Dropdown>

            <Dropdown overlay={languageMenu}>
              <Button style={{ marginBottom: "50px" }}>
                Select language <AlignRightOutlined />
              </Button>
            </Dropdown>

            <RangePicker onChange={handleDateChange} format='DD/MM/YYYY' style={{ alignSelf: "end" }} />
          </div>
          <div style={{ marginBottom: "50px" }}>
            <b>Current selection:</b> Category: {category}, Language: {language}
          </div>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={news}
            renderItem={item => (
              <List.Item
                onClick={() => {
                  props.history.push('/news', {
                    newsData: item,
                  })
                }}>
                <Card title={item.name} style={{ height: "400px" }}>
                  <div>
                    <Image
                      width="100%"
                      src={require(`../../../server/upload/${item.imageUrl}`)}
                      style={{ marginBottom: "15px" }}
                    />
                    {item.description}
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <Modal
            title={<span style={{ fontSize: "24px" }}>{modalData.name}</span>}
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => handleNewsDelete()}
            okText="Close"
            cancelText="Delete"
            centered
            maskClosable={false}
            width="70vw"
            closable={false}
          >
            <div style={{ fontSize: "18px" }}>
              <p>Name: {modalData.name}</p>
              <p>Description: {modalData.description}</p>
              <p>Content: {modalData.content}</p>
            </div>
          </Modal>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; Copyright 2020 NewsHub</Footer>
      </Layout>
    </Layout >
  );
}

export default AdminNews;
