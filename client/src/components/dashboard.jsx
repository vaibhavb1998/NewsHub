import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _, { set } from 'lodash'
import { Skeleton, Button, Dropdown, List, Menu, message } from 'antd';
import { AlignRightOutlined, FileTextOutlined } from '@ant-design/icons';
import '../style/dashboard.css'
const constants = require("../config/constants");

const Dashboard = () => {

  const [apiData, setApiData] = useState([])
  const [sourceList, setSourceList] = useState([])
  const [newsSource, setNewsSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('top-headlines')

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/api/user/get-selected-source-list')
      .then(res => {
        setSourceList(res.data.data[0].sourcesId)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/${category}?sources=${newsSource}&apiKey=${constants.API_KEY}`)
      .then(res => {
        console.log(res.data.articles)
        if (res) {
          setApiData(res.data.articles)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [newsSource])

  function handleMenuClick(e) {
    console.log(e)
    setNewsSource(e.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick} defaultActiveFirst>
      {_.map(sourceList, (value) => (
        <Menu.Item key={value} icon={<FileTextOutlined />}>
          {(_.find(constants.newsSourceList, ['id', value])).name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="news-page">
      <div className="page-menu">
        <Dropdown overlay={menu}>
          <Button>
            Select source <AlignRightOutlined />
          </Button>
        </Dropdown>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={apiData}
        className="list"
        renderItem={item => (
          <List.Item
            key={item.title}
            className="list-item"
            extra={
              !loading && (
                <img
                  width={272}
                  alt="logo"
                  src={item.urlToImage ? item.urlToImage : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                />
              )
            }
          >
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                title={<a href={item.url} target="_blank">{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </Skeleton>
            <br />
            <Button type="link" href={item.url} target="_blank">Click here to Read more...</Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Dashboard;
