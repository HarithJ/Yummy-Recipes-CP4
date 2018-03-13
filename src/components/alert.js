import React, {Component} from 'react';

class Alert extends Component {
  componentDidMount() {
    this.timerID = setInterval(
      () => this.hide(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  hide = () => {
    this.props.hideAlert();
  }

  render() {
  return(
      <div className={`text-center alert ${this.props.alertType}`} role="alert">
        {this.props.alertMsg}
      </div>
  );
  }
}

export default Alert;
