import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Login from '../../../components/auth/login/login.js'

describe("login component", () => {
  const login = shallow(<Login />)

  it("renders properly", () => {
    expect(shallowToJson(login)).toMatchSnapshot();
  })
})
