import React, {Component} from 'react';
import axios from 'axios';
import Nav from '../navAfterLogin.js';
import Alert from '../alert.js'
import { Redirect } from "react-router-dom";

import Category from './category.js'
import Pagination from '../pagination'

class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      categoriesGotten: false,
      categoryToEdit: 0,
      categoryToAdd: '',
      searchValue: '',
      alertMsg: {display: false, msg: '', className: ''},
      redirect: false,
      pagination: {limit: 0, page: 1, totalPages: 1}
    }
  }

  getCategories = () => {
    let access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    let headers = {Authorization: `Bearer ${access_token}`}

    let pagination = this.state.pagination

    if (this.state.searchValue === '') {
      if (pagination.limit > 0) {
        return axios.get(`http://localhost:5000/api/v1.0/categories/category?limit=${pagination.limit}&page=${pagination.page}`, {headers})
          .then((response) => {
          this.setState((prevState) => ({
            categories: response.data.categories,
            categoriesGotten: true
          }))
        })
          .catch((error) => {
            let errorMsg = error.response.data.message
            if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
              this.setState({redirect: true})
            }
          })
      }

      else {
        return axios.get('http://localhost:5000/api/v1.0/categories/category', {headers})
          .then((response) => {
          this.setState((prevState) => ({
            categories: response.data.categories,
            categoriesGotten: true
          }))
        })
          .catch((error) => {
            let errorMsg = error.response.data.message
            if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
              this.setState({redirect: true})
            }
          })
      }
    }

    else {
      if (pagination.limit > 0) {
        return axios.get(`http://localhost:5000/api/v1.0/categories/category?q=${this.state.searchValue}&limit=${pagination.limit}&page=${pagination.page}`, {headers})
          .then((response) => {
          this.setState((prevState) => ({
            categories: response.data.categories,
            categoriesGotten: true
          }))
        })
          .catch((error) => {
            let errorMsg = error.response.data.message
            if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
              this.setState({redirect: true})
            }
          })
      }

      else {
        return axios.get(`http://localhost:5000/api/v1.0/categories/category?q=${this.state.searchValue}`, {headers})
          .then((response) => {
          this.setState((prevState) => ({
            categories: response.data.categories,
            categoriesGotten: true
          }))
        })
          .catch((error) => {
            let errorMsg = error.response.data.message
            if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
              this.setState({redirect: true})
            }
          })
      }
    }
  }

  setCategoryToEdit = (categoryId) => {
    this.setState(prevState => ({
      categoryToEdit: categoryId
    }))
  }

  categoriesModified = () => {
    this.setState({categoriesGotten: false})
  }

  handleAddCategory = (event) => {
    event.preventDefault();

    let access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    let headers = {Authorization: `Bearer ${access_token}`}

    axios({
      method: 'post',
      url: `http://localhost:5000/api/v1.0/categories/category`,
      headers: headers,
      data: {
        name: this.state.categoryToAdd
      }
    })
    .then((response) => {
      console.log(response.data);
      this.setAlertMsg("Category successfully added", 'alert-success');
      this.categoriesModified();
    })
    .catch((error) => {
      let errorMsg = error.response.data.message
      if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
        this.setState({redirect: true})
      }
      this.setAlertMsg(errorMsg, 'alert-danger');
    });
  }

  setSearchValue = (event) => {
    this.setState({
      searchValue: event.target.value,
      categoriesGotten: false
    })
    if (event.target.value) {
      this.props.history.push(`/categories?q=${event.target.value}`)
    }
    else {
      this.props.history.push(`/categories`)
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
    this.categoriesModified();
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
    this.categoriesModified();
  }

  setTotalPageNumbers = () => {
    let access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    let headers = {Authorization: `Bearer ${access_token}`}

    axios.get('http://localhost:5000/api/v1.0/categories/category', {headers})
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
        let errorMsg = error.response.data.message
        if(errorMsg.includes("login") || errorMsg.includes("Bearer")) {
          this.setState({redirect: true})
        }
        this.setState({
          alertMsg: {display: true, msg: errorMsg}
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
    if(this.state.redirect === true){
      return <Redirect to='/login' />
    }
    if (this.state.categoriesGotten === false)
    {
      this.getCategories();
    }

    return (
      <div>
      <Nav setSearchValue={this.setSearchValue}/>
      <div className="container-fluid mt-3">
        {
          this.state.alertMsg.display &&
          <Alert hideAlert={this.hideAlert} alertType={this.state.alertMsg.classes} alertMsg={this.state.alertMsg.msg} />
        }

        <br />

        <form method="Post" action="/addcategory/" name="addcategoryForm" onSubmit={this.handleAddCategory}>
          <div className="row justify-content-center">
            <div className="col-4">
              <input type="text" name="category_name" className="form-control validate"
                value={this.state.categoryToAdd}
                onChange={(event) => this.setState({categoryToAdd: event.target.value})}/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-success">Add Category</button>
            </div>
          </div>
        </form>

        <br />

        {this.state.categories.map(category => {
          let editing = false;
          if (category.id === this.state.categoryToEdit) {
            editing = true;
          }
          return <Category categoriesModified={this.categoriesModified} setAlertMsg={this.setAlertMsg}
                    editing={editing} setCategoryToEdit={this.setCategoryToEdit} key={category.id}
                    {...category} />
        })}

      </div>
      <Pagination pagination={this.state.pagination} changeLimit={this.changeLimit} changePage={this.changePage}/>
      </div>
    )
  }
}

export default Categories;
