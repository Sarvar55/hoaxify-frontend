import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getUser } from "../api/apiCalls";
import HoaxFeed from "../components/HoaxFeed";
import ProfileCard from "../components/ProfileCard";
import { Spinner } from "../components/Spinner";
import { useApiProgress } from "../shared/ApiProgres";

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { username } = useParams();
  const { t } = useTranslation();
  const pendingApiCall = useApiProgress(
    "post",
    "/api/1.0/users/" + username,
    true
  );

  useEffect(() => {
    setNotFound(false);
  }, [user]); //mantik su ki state degismis se deemk ki islem basarili ve user stati degismis

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [username]);

  if (pendingApiCall || (user.userName !== username && !notFound)) {
    // bunu boyle yaptik cunki ilk basta componetn yuklenirken
    /**
     * useEffect load userin cagiri ama onu beklemez asenkron oldugu icin ve asagii iner ama halen pendingApiCall false oldugu icin
     * spinere girmez ve asagidan deveam eder ProfileCard ve HoaxList ekrana basmaya calisir sonra ise pendingApi call true olur ama
     * artik spinner gosterilicek seviyyeye gelir ama artik spinner gozukmez halede olur unmounted olur bu da memory leak hatasi verir
     * onun icinde ilk basta asagi ksimi gostermemesi icin bu islemi yapiyoruz ki saagi tarafa inmesin ilk stati yuklesin eger state yukenmise
     * zaten stateki username ile path deki username esit olur ve alt kisim calismaya devam eder
     */
    return <Spinner />;
  }

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger d-flex">
          <h4>{t("User Not Found")}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ProfileCard user={user} />
        </div>
        <div className="col">
          <HoaxFeed />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
