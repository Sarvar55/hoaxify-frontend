import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgres from "../components/ButtonWithProgres";
import withApiProgres, { useApiProgress } from "../shared/ApiProgres";
import { signUpHandler } from "../redux/authActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
//proxy=> webpack tanmadigi requesleri arka planda localhst:8080 e gonderiyor
const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    userName: undefined,
    displayName: undefined,
    password: undefined,
    passwordRepeat: undefined,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //tavsiye edilen yontem state i direk degilde setState() diyerrek degistirmek
  const onChange = (event) => {
    const { value, name } = event.target;
    setErrors((prev) => {
      return {
        ...prev,
        [name]: undefined,
      };
    });
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log("onclicikn ustundeyem");
  const onClickSignUp = async (event) => {
    event.preventDefault();
    const body = {
      userName: form.userName,
      displayName: form.displayName,
      password: form.password,
    };

    const { history } = props;
    try {
      await dispatch(signUpHandler(body));
      history.push("/");
    } catch (error) {
      if (error.response.data.validationsErrors) {
        //bunu yaptik cunki asagida object parcalama yaptikda hata aliyorduk
        setErrors(error.response.data.validationsErrors);
      }
    }
    console.log("ciicin icinde");
  };
  console.log("signup istegindeyem");
  const pendingApiCallSignUp = useApiProgress("post", "/api/1.0/users");
  console.log("login istegindeyem");
  const pendingApiCallLogin = useApiProgress("post", "/api/1.0/auth");
  const pendingApiCall = pendingApiCallLogin || pendingApiCallSignUp;
  const { t } = useTranslation();
  const {
    userName: userNameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat)
    passwordRepeatError = t("Password mismatch");

  return (
    <div className="container">
      <form action="">
        <h1 className="text-center">{t("Signup Page")}</h1>
        <Input
          name="userName"
          label={t("UserName")}
          error={userNameError}
          onChange={onChange}
        />

        <Input
          name="displayName"
          label={t("Display Name")}
          error={displayNameError}
          onChange={onChange}
        />

        <Input
          name="password"
          label={t("Password")}
          type={"password"}
          error={passwordError}
          onChange={onChange}
        />

        <Input
          name="passwordRepeat"
          label={t("Password Repeat")}
          error={passwordRepeatError}
          type={"password"}
          onChange={onChange}
        />

        <div className="w-100 text-center">
          <ButtonWithProgres
            onClick={onClickSignUp}
            disabled={pendingApiCall}
            pendingApiCall={pendingApiCall}
            text="Sign"
          />{" "}
        </div>
        <LanguageSelector />
      </form>
    </div>
  );
};

export default UserSignupPage;
