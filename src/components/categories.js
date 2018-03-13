import React, {Component} from 'react';
import axios from 'axios';
import Nav from './navAfterLogin.js';
import Alert from './alert.js'
import {Redirect} from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      this.props.setAlertMsg(response.data.message, 'alert-success')
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
    })
    .catch((error) => {
      this.props.setAlertMsg(error.response.data.message, 'alert-danger');
    });
  }
  render() {
    if(this.props.editing) {
      return(
        <CategoryEditForm setAlertMsg={this.props.setAlertMsg} setCategoryToEdit={this.props.setCategoryToEdit} categoryName={this.props.Name} categoryId={this.props.id}/>
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
                  <i class="fas fa-pencil-alt"></i>
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
      alertMsg: {display: false, msg: '', className: ''},
      redirect: false
    }
  }

  getCategories = () => {
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}


    return axios.get('http://localhost:5000/api/v1.0/categories/category', {headers})
      .then((response) => {
      this.setState((prevState) => ({
        categories: prevState.categories.concat(response.data.categories),
        categoriesGotten: true
      }))
    })
      .catch((error) => {
        console.log("error");
        this.setState({redirect: true})
      })
  }

  setCategoryToEdit = (categoryId) => {
    this.setState(prevState => ({
      categoryToEdit: categoryId
    }))
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
      this.setAlertMsg("Category successfully added", 'alert-success')
    })
    .catch((error) => {
      this.setAlertMsg(error.response.data.message, 'alert-danger');
    });
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
      <Nav />
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
          return <Category setAlertMsg={this.setAlertMsg} editing={editing} setCategoryToEdit={this.setCategoryToEdit} key={category.id} {...category} />
        })}

      </div>
      </div>
    )
  }
}

export default Categories;
