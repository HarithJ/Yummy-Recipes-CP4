import React, {Component} from 'react';
import axios from 'axios';

class Ingredients extends Component {
  render() {
    return(
      <li>
        <input value={this.props.value} type="text" onChange={this.props.change}/>
      </li>
    );
  }
}

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfIngs: 0,
      ings: [],
      recipeTitle: '',
      recipeDirections: ''
    };
  }
  handleAddIng = () => {
		this.setState((prevState) => ({
      numberOfIngs: prevState.numberOfIngs+1,
      ings: prevState.ings.concat('')
    }))
  }
  handleChange = (index, e) => {
    const oldState = this.state.ings;
		oldState[index] = e.target.value
    this.setState({ings: oldState})
  }
  clearInputs = () => {
    let newIngs = [];
    let numberOfNewIngs = 0;

    for (let i = 0; i < this.state.numberOfIngs; i++) {
      if (this.state.ings[i]) {
        numberOfNewIngs++;
        newIngs.push(this.state.ings[i]);
      }
    }
    this.setState({
      numberOfIngs: numberOfNewIngs,
      ings: newIngs
    })
  }

  initialState = () => {
    return this.setState({
      numberOfIngs: 0,
      ings: [],
      recipeTitle: '',
      recipeDirections: ''
    })
  }

  handleAddRecipe = (event) => {
    event.preventDefault();
    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '');

    var headers = {Authorization: `Bearer ${access_token}`};

    let recipeData = {};
    recipeData['title'] = this.state.recipeTitle;
    for (let i = 0; i < this.state.numberOfIngs; i++) {
      recipeData[`ingredient${i+1}`] = this.state.ings[i];
    }
    recipeData['directions'] = this.state.recipeDirections;

    axios({
      method: 'post',
      url: `http://localhost:5000/api/v1.0/recipes/category/${this.props.categoryId}/recipe`,
      headers: headers,
      data: recipeData
    })
    .then((response) => {
      this.props.getRecipes();
      this.initialState();
      this.props.setAlertMsg(response.data.message, 'alert-success');
    })
    .catch((error) => {
      this.props.setAlertMsg(error.response.data.message, 'alert-danger');
    });
  }

  render() {
    const ingsList = this.state.ings.map((ing, index)=>{
      let value;
      if(this.state.ings[index] === undefined) {
        value = ''
      }
      else {
        value = this.state.ings[index]
      }
      return  <Ingredients key={index} value={value} change={this.handleChange.bind(this, index)}/>
    });
    return(
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add-recipe-modal">
          Add Recipe
        </button>

        <div class="modal fade" id="add-recipe-modal" tabindex="-1" role="dialog" aria-labelledby="addRecipeModal" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">

                <form name="addrecipeForm" id="add-recipe-modal-form">

                  <div class="modal-header">
                    <input type="text" class="form-control recipetitle" name="recipetitle" placeholder="Recipe Title"
                    value={this.state.recipeTitle}
                    onChange={(event) => this.setState({recipeTitle: event.target.value})}/>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body">


                    <h4>Ingredients</h4>
                    <ul id="ingredients">
                      {ingsList}
                    </ul>
                    <button type="button" className="col-auto btn btn-primary" onClick={this.handleAddIng}>
                      <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" className="col-auto btn btn-warning" onClick={this.clearInputs}>
                      clear
                    </button>

                    <h4>Directions</h4>
                    <div class="row">
                      <div class="col-12">
                        <textarea class="form-control directions" name="directions" rows="3"
                        value={this.state.recipeDirections}
                        onChange={(event) => this.setState({recipeDirections: event.target.value})}></textarea>
                      </div>
                    </div>

                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" onClick={ (e) => {this.clearInputs(); this.handleAddRecipe(e)} } data-dismiss="modal">Save changes</button>
                  </div>
                </form>

            </div>
          </div>
        </div>

      </div>
    );
  };
}

export default AddRecipe
