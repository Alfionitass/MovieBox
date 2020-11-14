import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import Navbar from "./components/Navigation";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id?" component={Detail} />
          <Route path="/search/:keyword?" component={Search} />
          <Route path="/user/edit" component={EditUser} />
          <Route path="/user/" component={User} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
