import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import CategoryEditForm from './editCategory.js'

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

export default Category;
