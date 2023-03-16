import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postHoax, postHoaxAttacment } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgres";
import ButtonWithProgres from "./ButtonWithProgres";
import ProfileImage from "./ProfileImage";
import Input from "../components/Input.jsx";
import AutoUploadImage from "./AutoUploadImage";
import { Spinner } from "./Spinner";

const HoaxSubmit = () => {
  const { image } = useSelector((store) => {
    return {
      image: store.image,
    };
  });

  const focusControl = useRef(null);
  const [focused, setFocused] = useState(false);
  const [newImage, setNewImage] = useState();
  const [text, setText] = useState("");
  const [validation, setValidation] = useState({});
  const [isCancel, setIsCancel] = useState(false);
  const [attachmentId, setAttachmentId] = useState();
  useEffect(() => {
    document.addEventListener("click", focusOnTextarea);
    return () => {
      document.removeEventListener("click", focusOnTextarea);
    };
  }, []);

  useEffect(() => {
    if (!focused) {
      setText("");
      setValidation({});
      setNewImage();
      setAttachmentId();
    }
  }, [isCancel, focused]);

  //   useEffect(() => {
  //     setValidation({});
  //   }, [focused]);
  useEffect(() => {
    setValidation({});
  }, [text]);

  const focusOnTextarea = (event) => {
    // if (
    //   focusControl.current == null ||
    //   !focusControl.current.contains(event.target)
    // )
    //   setFocused(false);
  };
  const onClickHoaxify = async (e) => {
    e.preventDefault();
    const body = {
      content: text,
      attachmentId,
    };
    try {
      const response = await postHoax(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationsErrors) {
        setValidation(error.response.data.validationsErrors);
      }
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };
  const uploadFile = async (file) => {
    const attacment = new FormData();
    attacment.append("file", file); //mulitfile cevirdik burada api tarafinda multifile bekledigi icin
    const response = await postHoaxAttacment(attacment);
    setAttachmentId(response.data.id);
  };
  const pendingApiForFileUpload = useApiProgress(
    "post",
    "/api/1.0/hoax-attacments",
    true
  );
  const pendingApiCall = useApiProgress("post", "/api/1.0/hoaxes");

  const { content } = validation;

  return (
    <div className="card p-1">
      <div className="d-flex gap-2 align-items-center">
        <ProfileImage
          image={image}
          widht="32px"
          height="32px"
          className="rounded-circle cursor"
        />
        <div className="d-flex flex-column flex-fill">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={focusControl}
            className={content ? "form-control is-invalid" : "form-control"}
            rows={focused ? "3" : "1"}
            onFocus={() => setFocused(true)}
            on
          />
          <div className="invalid-feedback d-flex justify-content-center">
            {content}
          </div>
        </div>
      </div>
      {focused && (
        <>
          {!newImage && <Input type={"file"} onChange={onChangeFile} />}
          {newImage && (
            <AutoUploadImage
              newImage={newImage}
              pending={pendingApiForFileUpload}
            />
          )}
          <div className="d-flex justify-content-end m-2 gap-2">
            <ButtonWithProgres
              onClick={(e) => onClickHoaxify(e)}
              className="btn btn-primary"
              text="Hoax Submit"
              pendingApiCall={pendingApiCall}
            >
              Hoaxify
            </ButtonWithProgres>
            <button
              disabled={pendingApiCall || pendingApiForFileUpload}
              className="btn btn-danger"
              onClick={() => setFocused(!focused)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HoaxSubmit;
