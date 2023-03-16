import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loguotSuccess } from "../redux/authActions";
import ProfileImage from "./ProfileImage";
const TopBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn, userName, image, displayName } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
      userName: store.userName,
      displayName: store.displayName,
      image: store.image,
    };
  });

  const [visible, setVisible] = useState(false);
  const menuVisible = useRef(null);
  const onLogoutSuccess = () => {
    dispatch(loguotSuccess());
  };
  
  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]); //burasinin sadece loggeindegistigi drumda calismasi icin

  const menuClickTracker = (event) => {
    if (
      menuVisible.current == null ||
      !menuVisible.current.contains(event.target)
    )
      setVisible(false);
  };

  let links = (
    <ul className="navbar-nav mx-0 ">
      <li className="nav-item mx-2">
        <Link className="text-decoration-none" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="text-decoration-none" to="/signup">
          {t("Sign Up")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav mx-0 ">
        <li>
          <div
            ref={menuVisible}
            onClick={() => setVisible(!visible)}
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <ProfileImage
              image={image}
              width="32px"
              height="32px"
              className="rounded-circle mx-auto"
            ></ProfileImage>
            <span className="nav-link dropdown-toggle">{displayName}</span>
          </div>
          <div
            className={
              visible ? "dropdown-menu show p-0" : "dropdown-menu  p-0"
            }
          >
            <li
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={onLogoutSuccess}
            >
              {t("Logout")}
            </li>
            <li className="dropdown-item">
              <Link
                className="text-decoration-none"
                to={`/user/${userName}`}
                onClick={() => setVisible(false)}
              >
                {"My Profile"}
              </Link>
            </li>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm bg-body-tertiary mb-3 navbar-expand-lg">
      <nav class="navbar  container">
        <Link className="navbar-brand" to="/">
          Hoaxify
        </Link>
        {links}
      </nav>
    </div>
  );
};

// const mapStateToProps = (store) => {
//   return {
//     isLoggedIn: store.isLoggedIn,
//     userName: store.userName,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogoutSuccess: () => {
//       return dispatch(loguotSuccess());
//     },
//   };
// };

export default TopBar;
