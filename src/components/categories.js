import React, {Component} from 'react';
import axios from 'axios';
import Nav from './navAfterLogin.js';
import Alert from './alert.js'
import { Link } from "react-router-dom";

import Pagination from './recipes/pagination'

class CategoryEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryId: ''
    }
  }

  componentWillMount() {
    this.setState({
      categoryName: this.props.categoryName,
      categoryId: this.props.categoryId
    })
  }

  handleEditing = (event) => {
    event.preventDefault();

    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios({
      method: 'put',
      url: `http://localhost:5000/api/v1.0/categories/category/${this.state.categoryId}`,
      headers: headers,
      data: {
        name: this.state.categoryName
      }
    })
    .then((response) => {
      this.props.setAlertMsg(response.data.message, 'alert-success');
      this.props.setCategoryToEdit(0);
      this.props.categoriesModified();
    })
    .catch((error) => {
      this.props.setAlertMsg(error.response.data.message, 'alert-danger');
    });
  }

  render() {
    return(
      <form onSubmit={this.handleEditing}>
        <div className="row justify-content-center">
          <div className="col-4">
            <input type="text" className="form-control validate"
              value={this.state.categoryName}
              onChange={(event) => this.setState({
                categoryName: event.target.value
              })}/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-warning">Edit Category</button>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={() => this.props.setCategoryToEdit(0)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
  )
  }
}

class Category extends Component {
  handleDelete = (event) => {
    event.preventDefault();

    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios({
      method: 'delete',
      url: `http://localhost:5000/api/v1.0/categories/category/${this.props.id}`,
      headers: headers,
      data: {
        name: this.props.Name
      }
    })
    .then((response) => {
      this.props.setAlertMsg(response.data.message, 'alert-success');
      this.props.categoriesModified();
    })
    .catch((error) => {
      this.props.setAlertMsg(error.response.data.message, 'alert-danger');
    });
  }
  render() {
    if(this.props.editing) {
      return(
        <CategoryEditForm categoriesModified={this.props.categoriesModified} setAlertMsg={this.props.setAlertMsg} setCategoryToEdit={this.props.setCategoryToEdit} categoryName={this.props.Name} categoryId={this.props.id}/>
      )
    }
    else {
      return (
        <div>
          <div className="row justify-content-center">

            <div className="col-7">
              <h4><Link to={`${this.props.id}/recipes`}>{this.props.Name}</Link></h4>
            </div>

            <div className="col-auto">
              <button className="btn btn-outline-warning rounded-circle"
                onClick={() => this.props.setCategoryToEdit(this.props.id)}>
                  <i className="fas fa-pencil-alt"></i>
              </button>
            </div>

            <div className="col-auto">
              <button className="btn btn-outline-danger rounded-circle"
                onClick={this.handleDelete}>
                <i className="far fa-trash-alt"></i>
              </button>
            </div>

          </div>
          <br />
        </div>
      );
    }

  }
}



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
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

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
            console.log("error");
            this.setState({redirect: true})
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
            console.log("error");
            this.setState({redirect: true})
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
            console.log("error");
            this.setState({redirect: true})
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
            console.log("error");
            this.setState({redirect: true})
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

    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

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
      this.setAlertMsg(error.response.data.message, 'alert-danger');
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
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

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
          var editing = false;
          if (category.id === this.state.categoryToEdit) {
            editing = true;
          }
          return <Category categoriesModified={this.categoriesModified} setAlertMsg={this.setAlertMsg} editing={editing} setCategoryToEdit={this.setCategoryToEdit} key={category.id} {...category} />
        })}

      </div>
      <Pagination pagination={this.state.pagination} changeLimit={this.changeLimit} changePage={this.changePage}/>
      </div>
    )
  }
}

export default Categories;
