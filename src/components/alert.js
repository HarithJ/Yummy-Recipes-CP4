import React, {Component} from 'react';

class Alert extends Component {
  /*
   * Displays alert msg using props: this.props.alertType (bootsrap alert type e.g alert-success), this.props.alertMsg.
   * It calls hideAlert func which it gets from props after 5 secs.
   */
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
