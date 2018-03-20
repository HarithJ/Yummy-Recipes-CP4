import React, {Component} from 'react';
import Recipe from './recipe.js';
import axios from 'axios';
import { Redirect } from "react-router-dom";

import AddRecipe from './addRecipe.js'

class Recipes extends Component {
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
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    if (pagination.limits > 0) {
      axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe?q=${toBeSearched}&limit=${pagination.limit}&page=${pagination.page}`, {headers})
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
      axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe?q=${toBeSearched}`, {headers})
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
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    if (pagination.limit > 0) {
      axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe?limit=${pagination.limit}&page=${pagination.page}`, {headers})
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
      axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe`, {headers})
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
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios({
      method: 'delete',
      url: `http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe/${recipeId}`,
      headers: headers
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
