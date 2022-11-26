import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls.js";
import Input from "../components/Input.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";

class UserLoginPage extends Component {
  state = {
    userName: null,
    password: null,
    pendingApiCall: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();

    const { userName, password } = this.state;
    const creds = {
      username: userName,
      password,
    };

    await login(creds);
  };

  render() {
    const { t } = this.props;
    const { pendingApiCall } = this.state;
    return (
      <div>
        <div className="container">
          <h1 className="text-center">{t("Login")}</h1>
          <form action="" className="w-100 h-75 d-flex flex-column gap-4">
            <Input
              label={t("UserName")}
              error=""
              name="userName"
              onChange={this.onChange}
              type="text"
            />
            <Input
              label={t("Password")}
              error=""
              name="password"
              onChange={this.onChange}
              type="password"
            />
            <div>
              <button className="btn btn-primary" onClick={this.onClickLogin}>
                {pendingApiCall && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {t("Send")}
              </button>
            </div>
          </form>
          <LanguageSelector />
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserLoginPage);
