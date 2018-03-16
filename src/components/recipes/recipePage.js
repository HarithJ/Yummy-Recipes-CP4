import React, {Component} from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';

import Nav from '../navAfterLogin'
import Recipes from './recipes.js'
import Pagination from './pagination.js'
import Alert from '../alert.js'

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      search: false,
      pagination: {limit: 0, page: 1, totalPages: 1},
      alertMsg: {display: false, msg: '', classes: ''}
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
      pageNumber = parseInt(pageNumber, 10)
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
      limitNumber = parseInt(limitNumber, 10)
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

  setAlertMsg = (msg, type) => {
    this.setState({alertMsg: {display: true, msg: msg, classes: type}})
  }
  hideAlert = () => {
    this.setState({alertMsg: {display: false}})
  }

  render() {
    let categoryId = this.props.match.params.id;

    return(
      <div>
        <Nav search={this.search} setSearchValue={this.setSearchValue.bind(this)}/>
        <div class="container-fluid mt-3">
          {
            this.state.alertMsg.display &&
            <Alert hideAlert={this.hideAlert} alertType={this.state.alertMsg.classes} alertMsg={this.state.alertMsg.msg} />
          }

          <Recipes setAlertMsg={this.setAlertMsg} pagination={this.state.pagination} searchValue={this.state.searchValue} categoryId={categoryId}/>
          <Pagination pagination={this.state.pagination} changeLimit={this.changeLimit} changePage={this.changePage}/>
          <Link to='/categories'>
          <i class="btn-success fas fa-arrow-alt-circle-left" style={{position: "fixed", top: "50%", fontSize: "2.5em"}}></i>
          </Link>
        </div>
      </div>
    );
  }
}

export default RecipePage
