import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import RegistrationForm from '../../../components/auth/register/registrationForm.js'

describe("registration form component", () => {
  const registrationForm = shallow(<RegistrationForm />)

  it("renders properly", () => {
    expect(shallowToJson(registrationForm)).toMatchSnapshot();
  })

  it("has hide alert function", () => {
    expect(registrationForm.instance().hideAlert());
  })

  it("has a function to handle registration", () => {
    expect(registrationForm.instance().handleRegistration(global.event));
  })

  it("changes state", () => {
    registrationForm.setState({
      firstName: 'Harith',
      lastName: 'Bakhrani',
      userName: 'harithj',
      email: 'harithjaved@gmail.com',
      password: 'Password'
    });

    expect(registrationForm.find('#inputFirstName').props().value).toEqual('Harith');
    expect(registrationForm.find('#inputLastName').props().value).toEqual('Bakhrani');
    expect(registrationForm.find('#inputUsername').props().value).toEqual('harithj');
    expect(registrationForm.find('#inputEmail').props().value).toEqual('harithjaved@gmail.com');
    expect(registrationForm.find('#inputPassword').props().value).toEqual('Password');

  })
})
