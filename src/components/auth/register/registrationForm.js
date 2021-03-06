import React, {Component} from 'react';
import { Redirect } from 'react-router'
import axiosSettings from '../../../axiosSettings.js'

import Alert from '../../alert.js'

class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      redirect: false,
      alert: {display: false, msg: '', type: ''}
    }
  }

  handleRegistration = (event) => {
    event.preventDefault();

    axiosSettings.post('auth/register', {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      this.setState({
        redirect: true
      })
    })
    .catch((error) => {
      this.setState({
        alert: {display: true, msg: error.response.data.message, type:'alert-danger'}
      })
    })
  }

  hideAlert = () => {
    this.setState({
      alert: {display: false, msg: '', type:''}
    })
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
    return(
      <div className="container-fluid mTop">
          <h5 className="text-primary">Register Now!</h5>
          <form onSubmit={this.handleRegistration}>
            {
              this.state.alert.display &&

              <Alert hideAlert={this.hideAlert} alertType={this.state.alert.type} alertMsg={this.state.alert.msg} />
            }

              <div className="form-group row">
                  <label for="inputName" className="col-sm-2 col-form-label">Name*</label>
                  <div className="col">
                    <input id="inputFirstName" type="text" className="form-control" placeholder="First name"
                    value={this.state.firstName}
                    onChange={(event) => this.setState({
                      firstName: event.target.value
                    })} />
                  </div>
                  <div className="col">
                    <input id="inputLastName" type="text" className="form-control" placeholder="Last name"
                    value={this.state.lastName}
                    onChange={(event) => this.setState({
                      lastName: event.target.value
                    })}/>
                  </div>
              </div>

              <div className="form-group row">
                  <label for="userName" className="col-sm-2 col-form-label">User Name*</label>
                  <div className="col">
                    <input id="inputUsername" type="text" className="form-control" placeholder="User Name"
                    value={this.state.userName}
                    onChange={(event) => this.setState({
                      userName: event.target.value
                    })}/>
                  </div>
              </div>

              <div className="form-group row">
                  <label for="inputEmail" className="col-sm-2 col-form-label">Email address*</label>
                  <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail"
                      aria-describedby="emailHelp" placeholder="Enter email" name="email"
                      value={this.state.email}
                      onChange={(event) => this.setState({
                        email: event.target.value
                      })}/>
                  </div>
                  <small id="emailHelp" className="form-text text-muted col-sm-6">{"We'll never share your email with anyone else."}</small>
              </div>

              <div className="form-group row">
                  <label for="inputPassword" className="col-sm-2 col-form-label">Password*</label>
                  <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password"
                      value={this.state.password}
                      onChange={(event) => this.setState({
                        password: event.target.value
                      })} />
                  </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    )
  }
}

export default RegistrationForm;
