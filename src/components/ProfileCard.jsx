import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteUser, updateUser } from "../api/apiCalls";
import Input from "./Input";
import { loguotSuccess, updateSuccess } from "../redux/authActions";
import { useApiProgress } from "../shared/ApiProgres";
import ButtonWithProgres from "./ButtonWithProgres";
import Modal from "./Modal";
import ProfileImage from "./ProfileImage";

const ProfileCard = (props) => {
  const { userName: loggedInUsername } = useSelector((store) => {
    return {
      userName: store.userName,
    };
  });
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const [user, setUser] = useState({});
  const [newImage, setnewImage] = useState();
  const [error, setError] = useState({});
  const { username } = useParams();
  const { userName, image, displayName } = user;
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false);
  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + userName);
  const [modalVisible, setModalVisible] = useState(false);
  const pendingApiCallDelete = useApiProgress(
    "delete",
    "/api/1.0/users/" + userName,
    true
  );
  const navigation = useHistory();
  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setnewImage(undefined);
    } else setUpdatedDisplayName(displayName);
  }, [inEditMode]);

  useEffect(() => {
    if (username === loggedInUsername) setEditable(true);
  }, [username, loggedInUsername]);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  useEffect(() => {
    ///setError({}); burada direk boyle desek diger validation hatalarin da undefined olur onun icin de
    // bu yontemi uygulamamiz dogru deyil
    setError((prev) => {
      return {
        ...prev,
        displayName: undefined,
      };
    });
  }, [updatedDisplayName]);

  const onClickCancel = () => {
    setModalVisible(false);
    setModalVisible(false);
  };

  const onClickDeleteAccount = async () => {
    await deleteUser(loggedInUsername);
    setModalVisible(false);
    dispatch(loguotSuccess());
    navigation.push("/");
  };

  const onClickSave = async () => {
    let image;
    if (newImage !== undefined) {
      image = newImage.split(",")[1];
    }
    const body = {
      displayName: updatedDisplayName,
      image,
    };

    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      if (error.response.data.validationsErrors)
        setError(error.response.data.validationsErrors);
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    setError((prev) => {
      return {
        ...prev,
        image: undefined,
      };
    });
    fileReader.onloadend = () => {
      setnewImage(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };
  const { displayName: displayNameError, image: imageError } = error;
  console.log(imageError);
  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImage
          width={"200px"}
          height="200px"
          className="rounded-circle"
          image={image}
          tempimage={newImage}
          alt={`${userName} profile picture`}
        />
      </div>
      <div className="card-body">
        {!inEditMode && (
          <>
            <h3>
              {displayName}@{userName}
            </h3>
            {editable && (
              <div>
                <button
                  className="btn btn-success mb-1"
                  onClick={() => setInEditMode(true)}
                >
                  {t("Edit")}
                </button>
                <div>
                  <button
                    onClick={() => setModalVisible(true)}
                    className="btn btn-danger"
                  >
                    Delete my Account
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {inEditMode && (
          <div>
            <Input
              label="Change Display Name"
              defaultValue={displayName}
              error={displayNameError}
              onChange={(e) => setUpdatedDisplayName(e.target.value)}
            />
            <Input type="file" error={imageError} onChange={onChangeFile} />
            <div className="d-flex justify-content-center align-content-center gap-2">
              <ButtonWithProgres
                className="btn btn-primary"
                onClick={onClickSave}
                disabled={pendingApiCall}
                text={t("Save")}
                pendingApiCall={pendingApiCall}
              />
              <button
                className="btn btn-danger"
                disabled={pendingApiCall}
                onClick={() => setInEditMode(false)}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={"Delete my Account"}
        message={
          <div>
            <strong>Are you sure delete your account?</strong>
          </div>
        }
        onClickOk={onClickDeleteAccount}
        verifyButtonMessage={"Delete my Acount"}
        onClickCancel={onClickCancel}
        pendingApiCall={pendingApiCallDelete}
      />
    </div>
  );
};

// class ProfileCardContextWrapper extends React.Component {
//   static contextType = Authentication;
//   render() {
//     return (
//       <ProfileCard
//         {...this.props}
//         userName={this.context.state.userName}
//       ></ProfileCard>
//     );
//   }
// }

// const mapStateToProps = (store) => {
//   return {
//     userName: store.userName,
//   };
// };

export default ProfileCard;
