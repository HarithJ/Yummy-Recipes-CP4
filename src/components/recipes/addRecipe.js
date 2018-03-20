import React, {Component} from 'react';
import axiosSettings from '../../axiosSettings.js'

class Ingredients extends Component {
  /*
   * It renders a modal that has input fields for the user to enter in the recipe details.
   *
   * State:
   * numberOfIngs > number of ingredients in the recipes
   * ings > list of Ingredients
   * recipeTitle >
   * recipeDirections >
   *
   * Functions:
   * initialState > sets the state to the recipe that was stored.
   * handleAddIng > it updates the state when a user clicks on the add ing btn
   * handleChange > it updates the ings state, correctly modifying the ing user edits
   * clearInputs > it removes empty inputs of ings
   * handleAddRecipe > it makes an axios request.
   */
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

    let recipeData = {};
    recipeData['title'] = this.state.recipeTitle;
    for (let i = 0; i < this.state.numberOfIngs; i++) {
      recipeData[`ingredient${i+1}`] = this.state.ings[i];
    }
    recipeData['directions'] = this.state.recipeDirections;

    axiosSettings({
      method: 'post',
      url: `recipes/category/${this.props.categoryId}/recipe`,
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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-recipe-modal">
          Add Recipe
        </button>

        <div className="modal fade" id="add-recipe-modal" tabIndex="-1" role="dialog" aria-labelledby="addRecipeModal" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">

                <form name="addrecipeForm" id="add-recipe-modal-form">

                  <div className="modal-header">
                    <input type="text" className="form-control recipetitle" name="recipetitle" placeholder="Recipe Title"
                    value={this.state.recipeTitle}
                    onChange={(event) => this.setState({recipeTitle: event.target.value})}/>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">


                    <h4>Ingredients</h4>
                    <ul id="ingredients">
                      {ingsList}
                    </ul>
                    <button type="button" className="col-auto btn btn-primary" onClick={this.handleAddIng}>
                      <i className="fas fa-plus"></i>
                    </button>
                    <button type="button" className="col-auto btn btn-warning" onClick={this.clearInputs}>
                      clear
                    </button>

                    <h4>Directions</h4>
                    <div className="row">
                      <div className="col-12">
                        <textarea className="form-control directions" name="directions" rows="3"
                        value={this.state.recipeDirections}
                        onChange={(event) => this.setState({recipeDirections: event.target.value})}></textarea>
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={ (e) => {this.clearInputs(); this.handleAddRecipe(e)} } data-dismiss="modal">Save changes</button>
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
