import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Form,
  Button,
  Select,
  Typography,
  Card,
  Image,
  Dropdown,
  List,
  Modal,
  message,
  DatePicker,
  Input,
} from "antd";
import _, { set } from "lodash";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  AlignRightOutlined,
  DownOutlined,
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../style/userNews.css";

const { Header, Sider, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

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
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/login">Logout</a>
    </Menu.Item>
  </Menu>
);

const AdminNewsList = (props) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("all-news");
  const [language, setLanguage] = useState("english");
  const [date, setDate] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [logoText, setLogoText] = useState("NewsHub");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalNameValue, setModalNameValue] = useState("");
  const [modalContentValue, setModalContentValue] = useState("");
  const [modalDescriptionValue, setModalDescriptionValue] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updateNewsTitle, setUpdateNewsTitle] = useState("");
  const [updateNewsDescription, setUpdateNewsDescription] = useState("");
  const [updateNewsContent, setUpdateNewsContent] = useState("");

  let history = useHistory();

  const toggle = () => {
    if (!collapsed) {
      setLogoText("NH");
    } else {
      setLogoText("NewsHub");
    }
    setCollapsed(!collapsed);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/user/news?category=${category}&language=${language}&date=${date}`
      )
      .then((res) => {
        setNews(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, language, date]);

  const handleCategoryChange = (e) => {
    console.log(e.key);
    setCategory(e.key);
  };

  const handleLanguageChange = (e) => {
    console.log(e.key);
    setLanguage(e.key);
  };

  const handleDateChange = (value, dateString) => {
    setDate(value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const categoryMenu = (
    <Menu onClick={handleCategoryChange} defaultActiveFirst>
      <Menu.Item key="all-news">
        <a target="_blank">All News</a>
      </Menu.Item>
      <Menu.Item key="national">
        <a target="_blank">National</a>
      </Menu.Item>
      <Menu.Item key="international">
        <a target="_blank">International</a>
      </Menu.Item>
      <Menu.Item key="technology">
        <a target="_blank">Science & Technology</a>
      </Menu.Item>
      <Menu.Item key="politics">
        <a target="_blank">Politics</a>
      </Menu.Item>
      <Menu.Item key="devotional">
        <a target="_blank">Devotional</a>
      </Menu.Item>
      <Menu.Item key="sports">
        <a target="_blank">Sports</a>
      </Menu.Item>
    </Menu>
  );

  const languageMenu = (
    <Menu onClick={handleLanguageChange} defaultActiveFirst>
      <Menu.Item key="bengali">
        <a target="_blank">Bengali</a>
      </Menu.Item>
      <Menu.Item key="english">
        <a target="_blank">English</a>
      </Menu.Item>
      <Menu.Item key="hindi">
        <a target="_blank">Hindi</a>
      </Menu.Item>
      <Menu.Item key="kannada">
        <a target="_blank">Kannada</a>
      </Menu.Item>
      <Menu.Item key="urdu">
        <a target="_blank">Urdu</a>
      </Menu.Item>
    </Menu>
  );

  const handleNewsClick = () => {
    console.log("here 5", modalData);
    props.history.push("/admin/news-page", {
      newsData: modalData,
    });
  };

  const handleNewsDelete = () => {
    if (!_.isEmpty(modalData)) {
      axios
        .delete(
          `http://localhost:5000/api/admin/delete/news?newsId=${modalData._id}`
        )
        .then((res) => {
          message.success("News deleted successfully");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          message.error("Some error happened");
        });
    }
  };

  const handleNewsEdit = () => {
    // e.preventDefault();
    console.log("updateNewsTitle", updateNewsTitle);
    console.log("updateNewsDescription", updateNewsDescription);
    console.log("updateNewsContent", updateNewsContent);

    if (
      !_.isEmpty(updateNewsTitle) &&
      !_.isEmpty(updateNewsDescription) &&
      !_.isEmpty(updateNewsContent)
    ) {
      const bodyValue = {
        name: updateNewsTitle,
        content: updateNewsDescription,
        description: updateNewsContent,
      };

      window.console.log("body value: ", bodyValue);
      window.console.log("news Id: ", modalData._id);

      axios
        .put(
          `http://localhost:5000/api/admin/edit/news?newsId=${modalData._id}`,
          bodyValue
        )
        .then((res) => {
          message.success("News updated successfully");
          setModalVisible(false);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          message.error("Some error happened");
        });
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{logoText}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<FileSyncOutlined />}
            onClick={() => history.push("/admin/news")}
          >
            Manage News
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FileAddOutlined />}
            onClick={() => history.push("/admin/add/news")}
          >
            Add News
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UsergroupAddOutlined />}
            onClick={() => history.push("/admin/add/user")}
          >
            Create New Admin
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            style={{ float: "right", paddingRight: "40px", marginTop: "10px" }}
          >
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined style={{ color: "white", fontSize: "30px" }} />
                <DownOutlined style={{ color: "white", fontSize: "15px" }} />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Title level={2} style={{ marginBottom: "20px" }}>
            News
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
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

            <RangePicker
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              style={{ alignSelf: "end" }}
            />
          </div>
          <div style={{ marginBottom: "50px" }}>
            <b>Current selection:</b> Category: {category}, Language: {language}
          </div>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={news}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.name}
                  style={{ height: "450px" }}
                  style={{ minHeight: "100%", position: "relative" }}
                  onClick={() => {
                    props.history.push("/admin/news-page", {
                      newsData: item,
                    });
                  }}
                  s
                  actions={[
                    <DeleteOutlined
                      key="update"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(item);
                        setModalNameValue(item.name);
                        setModalDescriptionValue(item.description);
                        setModalContentValue(item.content);
                        setModalData(item);
                        setModalVisible(true);
                      }}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(item);
                        setModalNameValue(item.name);
                        setModalDescriptionValue(item.description);
                        setModalContentValue(item.content);
                        setModalData(item);
                        setEditModalVisible(true);
                        setUpdateNewsTitle(item.name);
                        setUpdateNewsDescription(item.description);
                        setUpdateNewsContent(item.content);
                      }}
                    />,
                  ]}
                >
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
            footer={[
              <Button key="delete" type="danger" onClick={handleNewsDelete}>
                <DeleteOutlined /> Delete
              </Button>,
              <Button key="close" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
            ]}
          >
            <div style={{ fontSize: "14px" }}>
              <p>Name: {modalData.name}</p>
              <p>Description: {modalData.description}</p>
              <p>Content: {modalData.content}</p>
            </div>
          </Modal>
          <Modal
            title={<span style={{ fontSize: "24px" }}>{modalData.name}</span>}
            visible={editModalVisible}
            onOk={() => setEditModalVisible(false)}
            onCancel={() => handleNewsEdit()}
            okText="Close"
            cancelText="Delete"
            centered
            maskClosable={false}
            width="70vw"
            closable={false}
            footer={[
              <Button key="edit" type="primary" onClick={handleNewsEdit}>
                <EditOutlined /> Update
              </Button>,
              <Button key="close" onClick={() => setEditModalVisible(false)}>
                Close
              </Button>,
            ]}
          >
            <div style={{ fontSize: "14px" }}>
              Name:{" "}
              <TextArea
                defaultValue={modalData.name}
                onChange={(e) => setUpdateNewsTitle(e.target.value)}
              />
              Description:{" "}
              <TextArea
                defaultValue={modalData.description}
                onChange={(e) => setUpdateNewsDescription(e.target.value)}
              />
              Content:{" "}
              <TextArea
                defaultValue={modalData.content}
                onChange={(e) => setUpdateNewsContent(e.target.value)}
              />
            </div>
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          &copy; Copyright 2020 NewsHub
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminNewsList;
