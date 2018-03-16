import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import queryString from 'query-string'
import axios from 'axios';

import Nav from '../navAfterLogin'
import AddRecipe from './addRecipe.js'
import Recipes from './recipes.js'
import Pagination from './pagination.js'

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      search: false,
      pagination: {limit: 0, page: 1, totalPages: 1}
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

  changePage = (pageNumber) => {
    if (pageNumber === 'Next') {
      this.setState((prevState) => ({
        pagination: {
          limit: prevState.pagination.limit,
          page: prevState.pagination.page+1,
          totalPages: prevState.pagination.totalPages
        }
      }))
    }
    else if (pageNumber === 'Previous') {
      this.setState((prevState) => ({
        pagination: {
          limit: prevState.pagination.limit,
          page: prevState.pagination.page-1,
          totalPages: prevState.pagination.totalPages
        }
      }))
    }
    else{
      pageNumber = parseInt(pageNumber)
      this.setState((prevState) => ({
        pagination: {
          limit: prevState.pagination.limit,
          page: pageNumber,
          totalPages: prevState.pagination.totalPages
        }
      }))
    }
  }

  changeLimit = (limitNumber) => {
    if (limitNumber === "All") {
      this.setState((prevState) => ({
        pagination: {
          limit: 0,
          page: prevState.pagination.page,
          totalPages: 1
        }
      }))
    }
    else {
      limitNumber = parseInt(limitNumber)
      this.setState((prevState) => ({
        pagination: {
          limit: limitNumber,
          page: prevState.pagination.page,
          totalPages: prevState.pagination.totalPages
        }
      }))
      this.setTotalPageNumbers();
    }
  }

  setTotalPageNumbers = () => {
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.match.params.id}/recipe`, {headers})
      .then((response) => {
      let key = Object.keys(response.data)[0]
      let totalRecipes = response.data[key].length

      let totalPages = Math.ceil(totalRecipes / this.state.pagination.limit);

      this.setState((prevState) => ({
        pagination: {
          limit: prevState.pagination.limit,
          page: prevState.pagination.page,
          totalPages: totalPages
        }
      }))
    })
      .catch((error) => {
        this.setState({
          alertMsg: {display: true, msg: error.response.data.message}
        })
      })
  }

  render() {
    let categoryId = this.props.match.params.id;

    return(
      <div>
        <Nav search={this.search} setSearchValue={this.setSearchValue.bind(this)}/>
        <div class="container-fluid mt-3">
          <AddRecipe categoryId={categoryId}/>
          <Recipes pagination={this.state.pagination} searchValue={this.state.searchValue} categoryId={categoryId}/>
          <Pagination pagination={this.state.pagination} changeLimit={this.changeLimit} changePage={this.changePage}/>
        </div>
      </div>
    );
  }
}

export default RecipePage
