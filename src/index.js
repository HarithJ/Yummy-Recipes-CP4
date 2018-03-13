import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './style/bootstrap-4.0.0-dist/css/bootstrap.min.css'
import './style/bootstrap-4.0.0-dist/css/bootstrap-grid.min.css'
import './style/myCSS.css'

import registerServiceWorker from './registerServiceWorker';

import App from './App.js';

ReactDOM.render((
  <BrowserRouter>
  <App />
  </BrowserRouter>
  ),
  document.getElementById('root'));

registerServiceWorker();
