import React from 'react';
import { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import RecipePage from '../../../components/recipes/recipePage.js'

describe("recipe page component", () => {
  const event = {
    target: { value: '' },
    preventDefault: jest.fn(),
  };

  it("renders properly", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />)

    expect(shallowToJson(recipePage)).toMatchSnapshot();
  })

  it("has a function to set search value", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    recipePage.setProps({"history": {"push": jest.fn()}})

    expect(recipePage.instance().setSearchValue(event));
  })

  it("has a function to handle changing of a page", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    expect(recipePage.instance().changePage(3));
  })

  it("has a function to handle changing recipe limits", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    expect(recipePage.instance().changeLimit(3));
  })

  it("has a function to set total number of pages", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    expect(recipePage.instance().setTotalPageNumbers());
  })

  it("has a function to set alert", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    expect(recipePage.instance().setAlertMsg());
  })

  it("has a function to hide alert", () => {
    const recipePage = shallow(<RecipePage match={{params: {}}} />);

    expect(recipePage.instance().hideAlert());
  })
})
