import React, {Component} from 'react';

import food from '../../images/food.jpg'
import recipe from '../../images/recipe.jpg'

class Header extends Component {
  render() {
    return (
      <div className="row header">
        <div className="col-4 align-self-center header-text">
          <h1 className="text-center">Yummy Recipes</h1>
        </div>
        <div className="col-3 header-img1">
          <img src={recipe} className="img-fluid img-thumbnail" style={{transform: 'rotate(20deg)'}} />
        </div>
        <div className="col-3 align-self-center header-img2">
          <img src={food} className="img-fluid img-thumbnail text-right" />
        </div>
      </div>
    );
  }
}

export default Header;
