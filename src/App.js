import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import LoginSuccessful from "./components/login-success.component";
import Login from "./components/login.component";
import UserInfo from "./components/user-information.component";
import axios from 'axios';


class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userName: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
    console.log(this.state.loggedIn);
  }

  componentWillUnmount()  {
    
  }

  updateUser(userObject) {
    console.log("userObject",userObject);
    this.setState(userObject);
  }

  getUser() {
    axios.get('/posts/').then(res => {
      console.log('Get user response: ', res.data);
      if (res.data.user) {
        console.log('Get User: There is a user saved in the server session: ', res.data.user);

        this.setState({
          loggedIn: true,
          userName: res.data.user.userName
        });
      }

      else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          userName: null
        })
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          <br />
          
          {this.state.loggedIn &&
            <p>Join the party, {this.state.userName}!</p>
            
          }
          <Route path="/create-user" exact component={CreateUser} />
          
          <Route path="/login-successful" render={() => <LoginSuccessful updateUser={this.updateUser} loggedIn={this.state.loggedIn} /*this.state.loggedIn aiheuttaa no-op ongelman*/ />} />
          <Route path="/login" render={() => <Login updateUser={this.updateUser} />} />
          <Route path="/user-info" render={() => <UserInfo updateUser={this.updateUser} loggedIn={this.state.loggedIn} />} />
        </div>
      </Router>
    );
  }
}

export default App;
