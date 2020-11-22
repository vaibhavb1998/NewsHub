import React, { useState, useEffect } from 'react'
import { Image, Typography } from 'antd'
import _ from 'lodash'

const { Title } = Typography;

const NewsPage = (props) => {

  const [newsData, setNewsData] = useState({})

  useEffect(() => {
    if (props.history.location.state) {
      setNewsData(props.history.location.state.newsData)
      console.log(newsData)
    }
  }, [])

  return (
    <div className="container">
      {
        _.isEmpty(newsData)
          ? <h1>News Page</h1>
          : <div style={{ display: "flex", alignItems: "center", minHeight: "100vh", flexDirection: "column", margin: "100px 0" }}>
              <div style={{ width: "800px" }}>
                <Title style={{ alignSelf: "flex-start", fontSize: "50px" }}>{newsData.name}</Title>
              </div>
              <div style={{ width: "800px"}}>
                <Title level={3} style={{ alignSelf: "flex-start" }}><i>By,</i>&nbsp;&nbsp;{newsData.author}</Title>
              </div>
              <div style={{ width: "800px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Title level={4} style={{ alignSelf: "flex-start" }}>Published on: {newsData.date.slice(0, 10)}</Title>
              </div>
              <Image
                width={800}
                height={400}
                src={require(`../../../server/upload/${newsData.imageUrl}`)}
                style={{ marginTop: "50px" }}
              />
              <div style={{ width: "800px", marginBottom: "200px" }}>
                <Title level={4} style={{ fontWeight: "400", marginTop: "50px" }}>{newsData.content}</Title>
              </div>
            </div>
      }
    </div>
  );
}

export default NewsPage;
