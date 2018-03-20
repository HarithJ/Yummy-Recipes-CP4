import React, {Component} from 'react';
import Nav from '../navAfterLogin.js';
import Alert from '../alert.js'
import { Redirect } from "react-router-dom";
import axiosSettings from '../../axiosSettings.js'

import Category from './category.js'
import Pagination from '../pagination'

class Categories extends Component {
  /*
   * Main component that holds the entire category page. It has: Navbar, alert msg, form to add a category,
   * Category component, & pagination component.
   *
   * State:
   * categories > list of categories,
   * categoriesGotten > bool that gets sets to false whenever there is a need to update categories,
   * categoryToEdit > holds the id of a category that need to be edited,
   * categoryToAdd > holds the name of a category that user wants to add,
   * searchValue > holds the value from search box,
   * alertMsg: {display: false, msg: '', className: ''},
   * redirect > true if user is unauthenticated,
   * pagination: {limit: 0, page: 1, totalPages: 1}
   *
   * getCategories > makes axios to get categories request depending on pagination and search value.
   * setCategoryToEdit > takes in categoryId as arg, and sets the state of categoryToEdit
   * categoriesModified > sets the state of categoriesGotten to false, it gets called when there is a change in categories and page needs update.
   * handleAddCategory > makes axios request to add category
   * setSearchValue > sets state
   * changePage >
   * changeLimit >
   * setTotalPageNumbers >
   * setAlertMsg >
   * hideAlert > 
   */
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
    let pagination = this.state.pagination

    if (this.state.searchValue === '') {
      if (pagination.limit > 0) {
        return axiosSettings.get(`categories/category?limit=${pagination.limit}&page=${pagination.page}`)
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
        return axiosSettings.get('categories/category')
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
        return axiosSettings.get(`categories/category?q=${this.state.searchValue}&limit=${pagination.limit}&page=${pagination.page}`)
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
        return axiosSettings.get(`categories/category?q=${this.state.searchValue}`)
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

    axiosSettings({
      method: 'post',
      url: `categories/category`,
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
    axiosSettings.get('categories/category')
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
