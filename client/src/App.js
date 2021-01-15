import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// antd stylesheet
import 'antd/dist/antd.css';

// import Navbar from "./components/Navbar";
import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/adminDashboard";
import UserNews from "./components/userNews";
import NewsList from "./components/newsList";
import AdminNewsList from "./components/adminNewsList";
import NewsPage from "./components/newsPage";
import AdminNewsPage from "./components/adminNewsPage"
import AdminAddNews from "./components/adminAddNews";
import AdminAddUser from "./components/adminAddUser";
import Success from "./components/success";
import TermsConditions from "./components/termsConditions";
import PageNotFound from "./components/pageNotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ minHeight: "100vh" }}>
          <Route exact path="/user/news" component={NewsList} />
          <Route exact path="/admin/add/news" component={AdminAddNews} />
          <Route exact path="/admin/add/user" component={AdminAddUser} />
          <Route exact path="/admin/news" component={AdminNewsList} />
          <Route exact path="/admin/news-page" component={AdminNewsPage} />
          <Route exact path="/news-page" component={NewsPage} />
          <Route exact path="/user" component={Dashboard} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/terms-conditions" component={TermsConditions} />
          <Route exact path="/page-not-found" component={PageNotFound} />
        </div>
      </Router>
    );
  }
}

export default App;
