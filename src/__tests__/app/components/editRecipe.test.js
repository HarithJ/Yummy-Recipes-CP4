import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import EditRecipe from '../../../components/recipes/editRecipe.js'

describe("edit recipe component", () => {
  it("renders properly", () => {
    const editRecipe = shallow(<EditRecipe recipeIngs={[]}/>)
    expect(shallowToJson(editRecipe)).toMatchSnapshot();
  })

  it("has a functions for handling edit", () => {
    const editRecipe = shallow(<EditRecipe recipeIngs={[]}/>)
    const preventDefault = jest.fn();

    expect(editRecipe.instance().handleEditRecipe({ preventDefault }));
    expect(editRecipe.instance().handleAddIng());
    expect(editRecipe.instance().clearInputs());
  })
})
