import React from "react";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import UserSignupPage from "../pages/UserSignupPage";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });
  return (
    <div>
      <TopBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {!isLoggedIn && (
          <Route
            path="/login"
            component={(props) => {
              return <UserLoginPage {...props} />;
            }}
          />
        )}
        <Route path="/signup" component={UserSignupPage} />
        <Route path="/user/:username" component={UserPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

// const mapStateToProps = (store) => {
//   return {
//     isLoggedIn: store.isLoggedIn,
//   };
// };
export default withRouter(App);
