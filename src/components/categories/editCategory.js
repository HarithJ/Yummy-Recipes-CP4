import React, {Component} from 'react';
import axiosSettings from '../../axiosSettings.js'

class CategoryEditForm extends Component {
  /*
   * Displays a form for editing a catgeory which already has a value  of previous category.
   * It also makes an axios request to edit a category.
   */
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

    axiosSettings({
      method: 'put',
      url: `categories/category/${this.state.categoryId}`,
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

export default CategoryEditForm;
