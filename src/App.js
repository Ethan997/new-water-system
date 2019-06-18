import React, { Component } from 'react';
import './App.css';
import Manage from './containers/Manage';
import Login from './containers/Login';
import Apply from './containers/Apply';


document.userState = 0;

class App extends Component {
  render() {
    if (document.userState === 0) {
      return (
        <div className="login">
          <Login />
        </div>
      );
    } else if (document.userState === 1) {
      return (
        <div className="apply">
          <Apply />
        </div>
      );
    }
    return (
      <div className="manage">
        <Manage />
      </div>
    );
  }
}

export default App;
