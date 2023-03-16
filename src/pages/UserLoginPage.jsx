import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/Input.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import ButtonWithProgres from "../components/ButtonWithProgres.jsx";
import { useApiProgress } from "../shared/ApiProgres.jsx";
import { loginHandler } from "../redux/authActions.js";
import { useState } from "react";
import { useDispatch } from "react-redux";

const UserLoginPage = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(null);
  }, [userName, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();

    setError(null);
    const creds = {
      userName: userName,
      password,
    };
    const { history } = props;
    try {
      await dispatch(loginHandler(creds));
      history.push("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };
  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
  const { t } = useTranslation();
  const buttonEnable = userName && password;
  return (
    <div>
      <div className="container">
        <h1 className="text-center">{t("Login")}</h1>
        <form action="" className="w-100 h-75 d-flex flex-column gap-4">
          <Input
            label={t("UserName")}
            error=""
            name="userName"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <Input
            label={t("Password")}
            error=""
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div>
            <ButtonWithProgres
              onClick={onClickLogin}
              disabled={pendingApiCall}
              pendingApiCall={pendingApiCall}
              text="Login"
            />{" "}
          </div>
        </form>
        <LanguageSelector />
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLoginSuccess: (state) => {
//       dispatch(loginSuccess(state));
//     },
//   };
// };

export default UserLoginPage;
