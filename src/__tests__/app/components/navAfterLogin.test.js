import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Nav from '../../../components/navAfterLogin.js'

describe("nav after login component", () => {
  const nav = shallow(<Nav />)

  it("renders properly", () => {
    expect(shallowToJson(nav)).toMatchSnapshot();
  })

  it("has a function to set search value", () => {
    expect(nav.instance().handleLogout(global.event));
  })
})
