import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import AddRecipe from '../../../components/recipes/addRecipe.js'

describe("add recipe component", () => {
  const addRecipe = shallow(<AddRecipe />)

  it("renders properly", () => {
    expect(shallowToJson(addRecipe)).toMatchSnapshot();
  })

  it("has functions to facilitate adding of a recipe", () => {
    const preventDefault = jest.fn();

    expect(addRecipe.instance().handleAddRecipe({ preventDefault }));
    expect(addRecipe.instance().handleAddIng());
    expect(addRecipe.instance().clearInputs());
  })
})
