import React, {Component} from 'react';

import Nav from '../nav.js'
import Header from '../header.js'
import RegistrationForm from './registrationForm.js'

const Register = (props) => {
  return(
    <div>
      <Nav link={'/login'} linkTitle={'Login'}/>
      <Header />
      <RegistrationForm />
    </div>
  );
}

export default Register;
