import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Categories from '../../../components/categories/categories.js'

describe("category module", () => {
    const categories = shallow(<Categories />)
    it("renders properly", () => {
      expect(shallowToJson(categories)).toMatchSnapshot();
    })

    it("has a function to get categories", () => {
      expect(categories.instance().getCategories());
    })

    it("has a function to set category to edit", () => {
      let categoryId = 2
      expect(categories.instance().setCategoryToEdit(categoryId));
    })

    it("has a function to call get categories", () => {
      expect(categories.instance().categoriesModified());
    })

    it("has a function to add a category", () => {
      expect(categories.instance().handleAddCategory(global.event));
    })

    it("has a function to set a search value", () => {
      categories.setProps({"history": {"push": jest.fn()}})
      expect(categories.instance().setSearchValue(global.event));
    })

    it("has a function to change a page", () => {
      let pageNumber = 2
      expect(categories.instance().changePage(pageNumber));
    })

    it("has a function to change the limit to number of categories", () => {
      let limitNumber = 3
      expect(categories.instance().changeLimit(limitNumber));
    })

    it("has a function to change the total number of pages", () => {
      expect(categories.instance().setTotalPageNumbers());
    })

    it("has a function to set alert msg", () => {
      expect(categories.instance().setAlertMsg());
    })

    it("has a function to hide alert", () => {
      expect(categories.instance().hideAlert());
    })
})
