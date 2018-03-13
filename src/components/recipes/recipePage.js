import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import queryString from 'query-string'

import Nav from '../navAfterLogin'
import AddRecipe from './addRecipe.js'
import Recipes from './recipes.js'

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      search: false
    }
    this.setSearchValue = this.setSearchValue.bind(this)
  }

  setSearchValue = (event) => {
    this.setState({
      searchValue: event.target.value
    })
    if (event.target.value) {
      this.props.history.push(`/${this.props.match.params.id}/recipes?q=${event.target.value}`)
    }
    else {
      this.props.history.push(`/${this.props.match.params.id}/recipes`)
    }
  }

  render() {
    let categoryId = this.props.match.params.id;

    return(
      <div>
        <Nav search={this.search} setSearchValue={this.setSearchValue.bind(this)}/>
        <div class="container-fluid mt-3">
          <AddRecipe categoryId={categoryId}/>
          <Recipes searchValue={this.state.searchValue} categoryId={categoryId}/>
        </div>
      </div>
    );
  }
}

export default RecipePage
