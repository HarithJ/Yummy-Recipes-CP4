import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  handleLogout = (event) => {
    event.preventDefault();

    var access_token = localStorage.getItem('accessToken');
    access_token = access_token.replace(/['"]+/g, '')

    var headers = {Authorization: `Bearer ${access_token}`}

    axios({
      method: 'get',
      url: `http://localhost:5000/api/v1.0/auth/logout`,
      headers: headers
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
      <form className="form-inline" onSubmit={(e) =>{
        e.preventDefault()
        this.props.search(e)}
      } >

        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          onChange={this.props.setSearchValue}/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>

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
