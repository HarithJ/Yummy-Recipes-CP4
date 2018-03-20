import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import CategoryEditForm from '../../../components/categories/editCategory.js'

describe("category module", () => {
    const categoryEditForm = shallow(<CategoryEditForm />)
    it("renders properly", () => {
      expect(shallowToJson(categoryEditForm)).toMatchSnapshot();
    })

    it("has a function to handle editing of a category", () => {
      expect(categoryEditForm.instance().handleEditing(global.event));
    })

})
