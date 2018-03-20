import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Header from '../../../components/auth/header.js'

describe("header component", () => {
  const header = shallow(<Header />)

  it("renders properly", () => {
    expect(shallowToJson(header)).toMatchSnapshot();
  })
})
