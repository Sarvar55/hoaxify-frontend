import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
const UserItem = (props) => {
  const { user } = props;
  const { userName, displayName, image } = user;

  return (
    <Link
      to={`/user/${userName}`}
      className="list-group-item list-group-item-action d-flex align-items-center"
      key={user.userName}
    >
      <ProfileImage
        className="rounded-circle"
        width={"32px"}
        height={"32px"}
        image={image}
        alt={`${userName} profile picture`}
      />
      <span className="pl-3">
        {" "}
        {displayName}@{userName}
      </span>
    </Link>
  );
};

export default UserItem;
