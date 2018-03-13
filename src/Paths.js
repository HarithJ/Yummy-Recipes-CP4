import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/auth/login/login.js'
import Register from './components/auth/register/register.js'
import Categories from './components/categories.js'
import RecipePage from './components/recipes/recipePage.js'

const Paths = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/categories' component={Categories}/>
      <Route exact path='/:id/recipes' component={RecipePage}/>
    </Switch>
  </BrowserRouter>
)

export default Paths;
