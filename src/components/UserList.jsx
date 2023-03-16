import { Button } from "bootstrap";
import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { getUsers } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgres";
import { Spinner } from "./Spinner";
import UserItem from "./UserItem";

// class Item extends React.Component {
//   state = {
//     userName: undefined,
//   };

//   componentDidMount() {
//     console.log("render edilen", this.props.user.userName);
//     this.setState({ userName: this.props.user.userName });
//   }
//   render() {
//     const { userName } = this.state;
//     return (
//       <div>
//         {userName}
//         <button onClick={this.props.onDelete}>Sil</button>
//       </div>
//     );
//   }
// }

const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });
  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("GET", "/api/1.0/users?currentPage");
  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const onClickPrev = () => {
    const prevPage = page.number - 1;
    loadUsers(prevPage);
  };

  const loadUsers = async (page) => {
    try {
      setLoadFailure(false);
      const res = await getUsers(page);
      setPage(res.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();

  const { content: users, first, last } = page;

  let actionDiv = (
    <div className="d-flex justify-content-between align-content-center">
      {last === false && (
        <button className="btn btn-light btn-sm" onClick={onClickNext}>
          {t("Next")}
        </button>
      )}
      {first === false && (
        <button className="btn btn-light btn-sm" onClick={onClickPrev}>
          {t("Previous")}
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    actionDiv = <Spinner />;
  }

  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Users")}</h3>
      <div className="list-group list-group-flush">
        {users.map((user) => {
          return <UserItem key={user.userName} user={user} />;
        })}
      </div>
      {actionDiv}
      {loadFailure && (
        <div className="text-center text-text-danger">Load Failure</div>
      )}
    </div>
  );
};
/**
 * //   return (
        //     <div style={{ display: "flex", gap: "10px" }}>
        //       <h6 key={index}>{user.userName}</h6>
        //       <button onClick={() => this.onDelete(index)}>Sil</button>
        //     </div>
        //   );
*/

export default UserList;
