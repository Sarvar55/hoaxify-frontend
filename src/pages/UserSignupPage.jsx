import React, { Component } from "react";
import { signUp, changeLanguage } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import turkey from "../images/turkey.png";
import usa from "../images/united-states-of-america.png";
//proxy=> webpack tanmadigi requesleri arka planda localhst:8080 e gonderiyor
class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  //tavsiye edilen yontem stati diek degilde setstate diyerrek degistirmek
  onChange = (event) => {
    const { t } = this.props;
    const { value, name } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("password mismach");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("password mismach");
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({
      [name]: value,
      errors,
    });
  };
  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = {
      username,
      displayName,
      password,
    };
    console.log(body);

    this.setState({ pendingApiCall: true });

    // signUp(body)
    //   .then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });

    try {
      const response = await signUp(body);
    } catch (error) {
      if (error.response.data.validationsErrors) {
        //bunu yaptik cunki asagida object parcalama yaptikda hata aliyorduk
        this.setState({ errors: error.response.data.validationsErrors });
      }
    }

    this.setState({ pendingApiCall: false });
  };
  onChangeLanguange = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { t } = this.props;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form action="">
          <h1 className="text-center">{t("Signup Page")}</h1>
          <Input
            name="username"
            label={t("UserName")}
            error={username}
            onChange={this.onChange}
          />

          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />

          <Input
            name="password"
            label={t("Password")}
            type={"password"}
            error={password}
            onChange={this.onChange}
          />

          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            type={"password"}
            onChange={this.onChange}
          />

          <div className="w-100 text-center">
            <button
              disabled={pendingApiCall || passwordRepeat !== undefined}
              className="btn btn-success mt-2 w-25 h-50 px-3"
              onClick={this.onClickSignUp}
              type="submit"
            >
              {pendingApiCall && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              SignUp
            </button>
          </div>
          <div>
            <img
              src={turkey}
              alt=""
              className="mx-1 pointer-event cursor"
              onClick={() => this.onChangeLanguange("tr")}
            />
            <img
              src={usa}
              alt=""
              className="mx-1 cursor"
              onClick={() => this.onChangeLanguange("en")}
            />
          </div>
        </form>
      </div>
    );
  }
}
const UserSingupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSingupPageWithTranslation;
