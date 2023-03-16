import React from "react";
import "../style/style.css";

const AutoUploadImage = ({ newImage, pending }) => {
  return (
    <div style={{ position: "relative" }}>
      <img className="img-thumbnail" src={newImage} alt="hoax atacment" />
      <div className="overlay" style={{ opacity: pending ? 1 : 0 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-black-50 m-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AutoUploadImage;
