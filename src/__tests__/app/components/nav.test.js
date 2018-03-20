import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Nav from '../../../components/auth/nav.js'

describe("nav component", () => {
  const nav = shallow(<Nav link={"register"} linkTitle={"Register"}/>)

  it("renders properly", () => {
    expect(shallowToJson(nav)).toMatchSnapshot();
  })
})
