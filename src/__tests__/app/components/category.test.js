import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Category from '../../../components/categories/category.js'

describe("category module", () => {
    const category = shallow(<Category />)
    it("renders properly", () => {
      expect(shallowToJson(category)).toMatchSnapshot();
    })

    it("has a function to delete category", () => {
      expect(category.instance().handleDelete(global.event));
    })

})
