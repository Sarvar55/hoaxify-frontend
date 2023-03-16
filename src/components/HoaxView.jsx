import i18next from "i18next";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { deleteHoax } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgres";
import Modal from "./Modal";
import ProfileImage from "./ProfileImage";

const HoaxView = (props) => {
  const { hoax, hoaxDelete } = props;
  const { user, content, createdAt, fileAttachment, hoaxId } = hoax;
  const { image, displayName, userName } = user;
  const [modalVisible, setModalVisible] = useState(false);
  const loggedInUser = useSelector((store) => store.userName);
  const pendinApiCall = useApiProgress("delete", `api/1.0/hoaxes/${hoaxId}`);
  const formatted = format(createdAt, i18next.language);
  const owndeByLoggedInUser = loggedInUser === userName;

  const onClickDelete = async (e) => {
    try {
      await deleteHoax(hoaxId);
      hoaxDelete(hoaxId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item my-1">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-1">
              <ProfileImage
                image={image}
                width="32px"
                height="32px"
                className="rounded-circle"
              />
              <Link
                className="my-auto text-decoration-none text-dark"
                to={"/user/" + userName}
              >
                <h6>
                  {displayName}@{userName}
                </h6>
              </Link>
            </div>
            <div className="d-flex flex-column">
              {owndeByLoggedInUser && (
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => setModalVisible(true)}
                >
                  Delete
                </button>
              )}
              <span>{formatted}</span>
            </div>
          </div>
          <div className="px-1">
            {content}
            <div className="px-1">
              {fileAttachment && (
                <img
                  className="img-fluid"
                  src={"images/attachments/" + fileAttachment.name}
                  alt={content}
                />
              )}
            </div>
          </div>
        </li>
      </ul>
      <Modal
        message={
          <div>
            <strong>Are you sure delete the Hoax?</strong>
            <div>{content}</div>
          </div>
        }
        title={"Delete Hoax"}
        onClickOk={onClickDelete}
        onClickCancel={onClickCancel}
        visible={modalVisible}
        verifyButtonMessage={"Delete my Hoax"}
        pendinApiCall={pendinApiCall}
      />
    </div>
  );
};

export default HoaxView;
