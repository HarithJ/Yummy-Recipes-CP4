import React, {Component} from 'react';
import { Redirect } from 'react-router';
import axiosSettings from '../axiosSettings.js'

class Nav extends Component {
  /*
   * Nav bar that gets called after a user logs in. It also has a logout button and a func to handle logout.
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  handleLogout = (event) => {
    event.preventDefault();

    axiosSettings({
      method: 'get',
      url: `auth/logout`
    })
      .then((response) => {
        localStorage.setItem("accessToken", '');

        this.setState({
          redirect: true
        })
      })
      .catch((error) => {
        this.setState({
          alert: true,
          msg: error.response.data.message,
          alertType: 'alert-danger'
        })
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
    let user = localStorage.getItem('user')
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <span className="navbar-brand mb-0 h2 header-text" style={{color: "#eee8aa"}}>
        Yummy
        <br />
        Recipes
      </span>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#yummyrecipesNavbar" aria-controls="yummyrecipesNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div id="yummyrecipesNavbar" className="collapse navbar-collapse">

        <input className="col-auto form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          onChange={this.props.setSearchValue}/>

        <span className="navbar-text ml-auto text-light">
        Welcome, {user}
      </span>

        <button type="button" className="btn btn-outline-warning ml-3" onClick={this.handleLogout}>Sign Out</button>

      </div>
    </nav>
    );
  }
}

export default Nav
