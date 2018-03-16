import React, {Component} from 'react';
import Recipe from './recipe.js';
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchedRecipe: '',
      alertMsg: {display: false, msg: ''}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
      if (nextProps.searchValue === '') {
        console.log(nextProps.pagination);
        this.getAllRecipes(nextProps.pagination);
      }
      else {
        this.setState({searchedRecipe: nextProps.searchValue})
        this.getSearchedRecipes(nextProps.searchValue, nextProps.pagination);
      }
    }
  }

  componentDidMount() {
    if (this.props.searchValue === '') {
      this.getAllRecipes(this.props.pagination);
    }
    else {
      this.setState({searchedRecipe: this.props.searchValue})
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
          this.setState({
            alertMsg: {display: true, msg: error.response.data.message}
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
          this.setState({
            alertMsg: {display: true, msg: error.response.data.message}
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
          alertMsg: {display: false, msg: ''},
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          this.setState({
            alertMsg: {display: true, msg: error.response.data.message}
          })
        })
    }

    else {
      axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe`, {headers})
        .then((response) => {
        let key = Object.keys(response.data)[0]
        this.setState({
          alertMsg: {display: false, msg: ''},
          recipes: response.data[key]
        })
      })
        .catch((error) => {
          this.setState({
            alertMsg: {display: true, msg: error.response.data.message}
          })
        })
    }
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
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
  }

  render() {
    if (this.state.alertMsg.display) {
      return(
      <div className={`text-center alert alert-info`} role="alert">
        {this.state.alertMsg.msg}
      </div>);
    }
    return(
      this.state.recipes.map(recipe => <Recipe categoryId={this.props.categoryId} handleDelete={this.handleDelete} {...recipe}/>)
    );
  }
}

export default Recipes;
