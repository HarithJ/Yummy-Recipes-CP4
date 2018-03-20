import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/auth/login/login.js'
import Register from './components/auth/register/register.js'
import Categories from './components/categories/categories.js'
import RecipePage from './components/recipes/recipePage.js'

import './style/bootstrap-4.0.0-dist/css/bootstrap.min.css'
import './style/bootstrap-4.0.0-dist/css/bootstrap.min.css'
import './style/bootstrap-4.0.0-dist/css/bootstrap-grid.min.css'
import './style/myCSS.css'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/categories' component={Categories}/>
      <Route exact path='/:id/recipes' component={RecipePage}/>
    </Switch>
  </BrowserRouter>
  ),
  document.getElementById('root'));
