import React, {Component} from 'react';
import Recipe from './recipe.js';
import { Redirect } from "react-router-dom";
import axiosSettings from '../../axiosSettings.js';

import AddRecipe from './addRecipe.js'

class Recipes extends Component {
  /*
   * This component is used to get all recipes, depending on whether
   * a search or pagination params were provided or not.
   * After getting recipes and storing them inside the state,
   * it renders Recipe component passing in each and every recipe.
   *
   * State:
   * recipes > its a list of recipes gotten from api.
   * redirect > its a boolean value, which gets set to false if a user is not logged in.
   *
   * Props:
   * Pagination > its a dictionary which contains; limit, pageNumber, totalPages.
   * setAlertMsg > a function on parent component, takes in 2 args; msg and type of msg (alert-success, alert-danger)
   *                (see bootstrap for type of alert msgs)
   * searchValue.
   * categoryId > used to retrieve recipes in that category.
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      redirect: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
      if (nextProps.searchValue === '') {
        console.log(nextProps.pagination);
        this.getAllRecipes(nextProps.pagination);
      }
      else {
        this.getSearchedRecipes(nextProps.searchValue, nextProps.pagination);
      }
    }
  }

  componentDidMount() {
    this.getRecipes()
  }

  getRecipes = () => {
    if (this.props.searchValue === '') {
      this.getAllRecipes(this.props.pagination);
    }
    else {
      this.getSearchedRecipes(this.props.searchValue, this.props.pagination);
    }
  }

  getSearchedRecipes = (toBeSearched, pagination) => {
    if (pagination.limits > 0) {
      axiosSettings.get(`recipes/category/${this.props.categoryId}/recipe?q=${toBeSearched}&limit=${pagination.limit}&page=${pagination.page}`)
        .then((response) => {
        let key = Object.keys(response.data)[0]
        this.setState({
          alertMsg: {display: false, msg: ''},
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          let errorMsg = error.response.data.message
          if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
            this.setState({redirect: true})
          }
          this.setState({
            alertMsg: {display: true, msg: errorMsg}
          })
        })
    }

    else {
      axiosSettings.get(`recipes/category/${this.props.categoryId}/recipe?q=${toBeSearched}`)
        .then((response) => {
        let key = Object.keys(response.data)[0]
        this.setState({
          alertMsg: {display: false, msg: ''},
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          let errorMsg = error.response.data.message
          if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
            this.setState({redirect: true})
          }
          this.setState({
            alertMsg: {display: true, msg: errorMsg}
          })
        })
    }

  }

  getAllRecipes = (pagination) => {
    if (pagination.limit > 0) {
      axiosSettings.get(`recipes/category/${this.props.categoryId}/recipe?limit=${pagination.limit}&page=${pagination.page}`)
        .then((response) => {
        let key = Object.keys(response.data)[0]
        this.setState({
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          let errorMsg = error.response.data.message
          if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
            this.setState({redirect: true})
          }
          this.setState({
            alertMsg: {display: true, msg: errorMsg}
          })
        })
    }

    else {
      axiosSettings.get(`recipes/category/${this.props.categoryId}/recipe`)
        .then((response) => {
        let key = Object.keys(response.data)[0]
        this.setState({
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          let errorMsg = error.response.data.message
          if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
            this.setState({redirect: true})
          }
          this.setState({
            alertMsg: {display: true, msg: errorMsg}
          })
        })
    }
    this.setState({recipesGotten: true})
  }

  handleDelete = (recipeId) => {
    axiosSettings({
      method: 'delete',
      url: `recipes/category/${this.props.categoryId}/recipe/${recipeId}`
    })
    .then((response) => {
      this.getRecipes()
      this.props.setAlertMsg(response.data.message, 'alert-success')
    })
    .catch((error) => {
      let errorMsg = error.response.data.message
      if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
        this.setState({redirect: true})
      }
      this.props.setAlertMsg(errorMsg, 'alert-danger')
    });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/login" />
    }
    return(
      <div>
      <AddRecipe getRecipes={this.getRecipes} setAlertMsg={this.props.setAlertMsg} categoryId={this.props.categoryId}/>
      {this.state.recipes.map(recipe => <Recipe setAlertMsg={this.props.setAlertMsg} getRecipes={this.getRecipes} categoryId={this.props.categoryId} handleDelete={this.handleDelete} {...recipe}/>)}
      </div>
    );
  }
}

export default Recipes;
