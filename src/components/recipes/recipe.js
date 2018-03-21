import React from 'react';
import EditRecipe from './editRecipe.js'

const Recipe = (props) => {
  /*
   * Display a Recipe using the props it gets from its parent component (Recipes)
   */
  return(
    <div className="row justify-content-center recipe">
        <div className="col-10">
        <hr/>

          <div className="row">
            <div className="col-10">
              <h3 className="recipetitle">{props.title}</h3>
            </div>

              <EditRecipe getRecipes={props.getRecipes} categoryId={props.categoryId} recipeId={props.id} recipeTitle={props.title} recipeIngs={props.ingredients}
              recipeDirections={props.directions} setAlertMsg={props.setAlertMsg}/>

            <div className="col-auto">
              <button className="btn btn-outline-danger rounded-circle"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleDelete(props.id)
                }}>
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <h5>Ingredients</h5>
              <ul>
                {props.ingredients.map((ingredient, i) =>
                  <li className={`ingredient${i+1}`}>{ingredient}</li>
                )}

              </ul>
            </div>

            <div className="col-sm-9">
              <h5>Directions</h5>
              <p className="directions">{props.directions}</p>
            </div>
          </div>

        </div>
      </div>
  );
}

export default Recipe
