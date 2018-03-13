import React, {Component} from 'react';
import EditRecipe from './editRecipe.js'

class Recipe extends Component {
  render() {
    return(
      <div className="row justify-content-center recipe">
          <div className="col-10">
          <hr/>

            <div className="row">
              <div className="col-10">
                <h3 className="recipetitle">{this.props.title}</h3>
              </div>

              <EditRecipe recipeTitle={this.props.title} recipeIngs={this.props.ingredients}
                recipeDirections={this.props.directions}/>

              <div className="col-auto">
                <button className="btn btn-outline-danger rounded-circle"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.handleDelete(this.props.id)
                  }}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">
                <h5>Ingredients</h5>
                <ul>
                  {this.props.ingredients.map((ingredient, i) =>
                    <li className={`ingredient${i+1}`}>{ingredient}</li>
                  )}

                </ul>
              </div>

              <div className="col-sm-9">
                <h5>Directions</h5>
                <p className="directions">{this.props.directions}</p>
              </div>
            </div>



          </div>
        </div>
    );
  }
}

export default Recipe
