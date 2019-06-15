import React, { Component } from 'react';
import './App.css';
import Manage from './containers/Manage';
import Login from './containers/Login';

const s = 0;

class App extends Component {
  render() {
    if (s === 0) {
      return (
        <div className="login">
          <Login />
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
