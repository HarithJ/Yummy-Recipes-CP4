import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import LoginForm from '../../../components/auth/login/loginForm.js'

describe("login form component", () => {
  const login = shallow(<LoginForm />)
  const preventDefault = jest.fn();

  it("renders properly", () => {
    expect(shallowToJson(login)).toMatchSnapshot();
  })

  it('it renders state initially', () => {
    expect(login.state().email).toEqual('');
    expect(login.state().password).toEqual('');
  });

  it('has the correct form fields', () => {
   expect(login.find('#inputName')).toHaveLength(1);
   expect(login.find('#inputPassword')).toHaveLength(1);
   expect(login.find('[type="submit"]')).toHaveLength(1);
 });

 it('Form fields update when state changes', () => {
    login.setState({ password: 'Password', email: 'email' });
    expect(login.find('#inputName').props().value).toEqual('email');
    expect(login.find('#inputPassword').props().value).toEqual('Password');
  });

  it('has handleSubmit function', () => {
    expect(login.instance().handleSubmit({ preventDefault }));
  })


  it('has hideAlert function', () => {
    expect(login.instance().hideAlert());
  })
})
