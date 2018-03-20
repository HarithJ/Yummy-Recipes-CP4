import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Pagination from '../../../components/pagination.js'

describe("pagination component", () => {
  const pagination = shallow(<Pagination pagination={{totalPages: 3}}/>)

  it("renders properly", () => {
    expect(shallowToJson(pagination)).toMatchSnapshot();
  })
})
