import React, { useState, useEffect } from "react";
import { Image, Typography } from "antd";
import _ from "lodash";
import axios from "axios";

const { Title } = Typography;

const NewsPage = (props) => {
  const [newsData, setNewsData] = useState({});
  const [newsListData, setNewsListData] = useState([]);

  useEffect(() => {
    if (props.history.location.state) {
      setNewsData(props.history.location.state.newsData);
      console.log(newsData);
    }

    axios
      .get(`http://localhost:5000/api/user/news?category=all-news&date=`)
      .then((res) => {
        setNewsListData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div
          style={{
            padding: "40px 200px",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          <a href="../user/news" style={{ color: "black" }}>
            NewsHub
          </a>
        </div>
        {_.isEmpty(newsData) ? (
          <h1>News Page</h1>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                margin: "200px 100px",
                fontSize: "24px",
              }}
            >
              Checkout latest news
              <div
                style={{
                  fontSize: "16px",
                  marginTop: "50px",
                }}
              >
                {_.map(newsListData, (d) => (
                  <div
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    onClick={() => setNewsData(d)}
                  >
                    - {d.name}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                minHeight: "100vh",
                flexDirection: "column",
                margin: "100px",
              }}
            >
              <div style={{ width: "800px" }}>
                <Title style={{ alignSelf: "flex-start", fontSize: "50px" }}>
                  {newsData.name}
                </Title>
              </div>
              <div style={{ width: "800px" }}>
                <Title level={3} style={{ alignSelf: "flex-start" }}>
                  <i>By,</i>&nbsp;&nbsp;{newsData.author}
                </Title>
              </div>
              <div
                style={{
                  width: "800px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Title level={4} style={{ alignSelf: "flex-start" }}>
                  Published on: {newsData.date.slice(0, 10)}
                </Title>
              </div>
              <Image
                width={800}
                height={400}
                src={require(`../../../server/upload/${newsData.imageUrl}`)}
                style={{ marginTop: "50px" }}
              />
              <div style={{ width: "800px", marginBottom: "200px" }}>
                <Title
                  level={4}
                  style={{ fontWeight: "400", marginTop: "50px" }}
                >
                  {newsData.content}
                </Title>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsPage;
