import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Col, Row } from 'antd';
import NewsSourceCard from './newsSourceCard'
const constants = require("../config/constants");

const Dashboard = () => {

  const [apiData, setApiData] = useState([])
  const { apiUrl } = useState(`http://newsapi.org/v2/top-headlines?country=us&` + `apiKey=${constants.API_KEY}`)
  const [sourceList] = useState(["the-hindu", "the-times-of-india", "cnn", "google-news-in",])

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/sources?apiKey=${constants.API_KEY}`)
      .then(res => {
        console.log(res.data.sources)
        if (res) {
          setApiData(res.data.sources)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {apiData.map((source) => {
            return (
              _.includes(sourceList, source.id) ?
                <Col span={8}>
                  <NewsSourceCard
                    name={source.name}
                    description={source.description}
                  />
                </Col>
                : null
            )
          })}
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
