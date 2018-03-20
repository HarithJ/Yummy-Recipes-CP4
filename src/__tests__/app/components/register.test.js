import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Register from '../../../components/auth/register/register.js'

describe("register component", () => {
  const register = shallow(<Register />)

  it("renders properly", () => {
    expect(shallowToJson(register)).toMatchSnapshot();
  })
})
