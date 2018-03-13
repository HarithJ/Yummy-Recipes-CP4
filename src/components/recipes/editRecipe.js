import React, {Component} from 'react';

class Ingredients extends Component {

  numberOfIng = () => {

  }
  render() {
    return(
      <li>
        <input value={this.props.value} type="text" onChange={this.props.change}/>
      </li>
    );
  }
}

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfIngs: 0,
      ings: [],
      recipeTitle: '',
      recipeDirections: ''
    };
  }
  componentDidMount() {
    this.setState({
      recipeTitle: this.props.recipeTitle,
      recipeDirections: this.props.recipeDirections,
      ings: this.props.recipeIngs,
      numberOfIngs: this.props.recipeIngs.length
    })
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.recipeTitle) !== JSON.stringify(nextProps.recipeTitle)){
      this.setState({
        recipeTitle: nextProps.recipeTitle,
        recipeDirections: nextProps.recipeDirections,
        ings: nextProps.recipeIngs,
        numberOfIngs: nextProps.recipeIngs.length
      })
    }
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

        <div className="col-auto">
          <button type="button" className="btn btn-outline-warning rounded-circle"
             data-toggle="modal" data-target="#edit-recipe-modal">
              <i class="fas fa-pencil-alt"></i>
          </button>
        </div>

        <div class="modal fade" id="edit-recipe-modal" tabindex="-1" role="dialog" aria-labelledby="editRecipeModal" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">

                <form name="addrecipeForm" id="add-recipe-modal-form"
                  onSubmit={this.handleAddRecipe}>

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
                    <button type="submit" class="btn btn-primary" onClick={this.clearInputs}>Save changes</button>
                  </div>
                </form>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default EditRecipe;
