import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Recipes from '../../../components/recipes/recipes.js'

describe("recipes component", () => {
  global.localStorage.setItem("accessToken", "'sakjdhwdhu'")

  let pagination = {limit: 0, page: 1, totalPages: 1}
  const recipes = shallow(<Recipes pagination={pagination} categoryId={9}/>)

  it("renders properly", () => {
    expect(shallowToJson(recipes)).toMatchSnapshot();
  })

  it("renders all the recipes properly", () => {
    recipes.setState({recipes:[1,2,3,4,5]});

    expect(recipes.find("Recipe").length).toBe(5)
  })

  it("has a function to get recipes", () => {
    expect(recipes.instance().getRecipes());
  })

  it("has a function to get searched recipes", () => {
    pagination = {limit: 3}

    expect(recipes.instance().getSearchedRecipes("nameToBeSearched", pagination));
  })

  it("has a function to get searched recipes without pagination", () => {
    pagination = {limit: 0}

    expect(recipes.instance().getSearchedRecipes("nameToBeSearched", pagination));
  })

  it("has a function to get all recipes", () => {
    pagination = {limit: 3}
    expect(recipes.instance().getAllRecipes(pagination));
  })

  it("has a function to get all recipes without pagination", () => {
    pagination = {limit: 0}
    expect(recipes.instance().getAllRecipes(pagination));
  })

  it("has a function to delete a recipe", () => {
    expect(recipes.instance().handleDelete());
  })
})
