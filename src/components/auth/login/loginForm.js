import React, {Component} from 'react';
import axios from 'axios'
import { CSSTransitionGroup } from 'react-transition-group'
import { Redirect } from 'react-router'

import Alert from '../../alert.js'

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      alert: false,
      msg: '',
      alertType: '',
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/v1.0/auth/login', {
      email: this.state.email,
      password: this.state.password
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("user", response.data.user);

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

  hideAlert = () => {
    this.setState({alert: false})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/categories' />
    }
    return(
      <div className="container-fluid mTop">
        <div className="row justify-content-center">
            <form className="col-sm-6" onSubmit={this.handleSubmit}>
            <CSSTransitionGroup
                  transitionName="example"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                {
                  this.state.alert &&

                  <Alert hideAlert={this.hideAlert} alertType={this.state.alertType} alertMsg={this.state.msg} />

                }
                </CSSTransitionGroup>

                <h5 className="text-secondary">Sign in!!!</h5>

                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" className="form-control"
                      id="inputName" aria-describedby="emailHelp"
                      value={this.state.email}
                      onChange={(event) => this.setState({
                        email: event.target.value
                      })}
                      placeholder="Enter name" name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control"
                      value={this.state.password}
                      onChange={(event) => this.setState({password: event.target.value})}
                      id="inputPassword" placeholder="Password" name="password" />
                </div>

                <div className="row justify-content-end">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </div>

      </div>
    );
  }
}

export default LoginForm;
