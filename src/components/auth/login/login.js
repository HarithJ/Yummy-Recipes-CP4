import React, {Component} from 'react';

import Nav from '../nav.js';
import Header from '../header.js';
import LoginForm from './loginForm.js';

class Login extends Component {
  render(){
    return (
      <div>
        <Nav link={'/register'} linkTitle={'Register'}/>
        <Header />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
