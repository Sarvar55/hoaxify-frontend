import React, { Component } from "react";
import axios from "axios";

class Sinup extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  sendSignupDataToWs = (event) => {
    event.preventDefault();
    const { username, password, displayName } = this.state;

    const body = {
      username,
      password,
      displayName,
    };
    axios.post("http://localhost:8080/api/1.0/users", body);
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="text-center">Login</h1>
          <form action="" className="w-100 h-75 d-flex flex-column gap-4">
            <Input
              label={"UserName"}
              error=""
              name="userName"
              onChange={this.onChange}
              type="text"
            />
            <Input
              label={"Password"}
              error=""
              name="password"
              onChange={this.onChange}
              type="password"
            />
            <div>
              <button className="btn btn-primary" onClick={this.onClickLogin}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Sinup;
