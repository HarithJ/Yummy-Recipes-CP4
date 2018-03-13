import React, {Component} from 'react';
import Recipe from './recipe.js';
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios.get(`http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe`, {headers})
      .then((response) => {
      let key = Object.keys(response.data)[0]
      this.setState({
        recipes: response.data[key]
      })
    })
      .catch((error) => {
        console.log("TODO: error");
      })
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

  handleEdit = () => {
    
  }

  render() {
    return(
      this.state.recipes.map(recipe => <Recipe handleDelete={this.handleDelete} {...recipe}/>)
    );
  }
}

export default Recipes;
