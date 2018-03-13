import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'

import Paths from './Paths.js'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Paths />
        </div>
    );
  }
}

export default App;
