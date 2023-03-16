import React from "react";
import { useSelector } from "react-redux";
import HoaxFeed from "../components/HoaxFeed";
import HoaxList from "../components/HoaxList";
import HoaxSubmit from "../components/HoaxSubmit";
import LanguageSelector from "../components/LanguageSelector";
import UserList from "../components/UserList";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });
  const hoaxSubmitShownForLoggedInUser = (
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-8">
          <div className="d-flex flex-column g-3">
            <HoaxSubmit />
            <div className="mt-1">
              <HoaxFeed />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <UserList></UserList>
        </div>
      </div>
      <LanguageSelector />
    </div>
  );
  if (isLoggedIn) {
    return hoaxSubmitShownForLoggedInUser;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <UserList></UserList>
        </div>
      </div>
      <LanguageSelector />
    </div>
  );
};

export default HomePage;
