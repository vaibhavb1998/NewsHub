import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';

// import Navbar from "./components/Navbar";
import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Success from "./components/success";
import PageNotFound from "./components/pageNotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ minHeight: "100vh" }}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/page-not-found" component={PageNotFound} />
        </div>
      </Router>
    );
  }
}

export default App;
