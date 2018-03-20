import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Recipe from '../../../components/recipes/recipe.js'

describe("Recipe component", () => {
  const recipe = shallow(<Recipe ingredients={[]}/>)

  it("renders properly", () => {
    expect(shallowToJson(recipe)).toMatchSnapshot();
  })

  it("displays properly", () => {
    const recipeObject = {
      "title": "Recipe title",
      "ingredients": ["ingredient1", "ingredient2"],
      "directions": "Directions to cook the recipe"
    }

    const recipeDisplayed = shallow(<Recipe {...recipeObject} />)

    expect(recipeDisplayed.find('.recipetitle').text()).toEqual("Recipe title")
    expect(recipeDisplayed.find('.directions').text()).toEqual("Directions to cook the recipe")
  })
})
