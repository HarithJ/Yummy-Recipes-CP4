import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Nav from '../navAfterLogin'
import AddRecipe from './addRecipe.js'
import Recipes from './recipes.js'

class RecipePage extends Component {
  render() {
    let categoryId = this.props.match.params.id;
    return(
      <div>
        <Nav />
        <div class="container-fluid mt-3">
          <AddRecipe categoryId={categoryId}/>
          <Recipes categoryId={categoryId}/>
        </div>
      </div>
    );
  }
}

export default RecipePage
