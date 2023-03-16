import React from "react";
import avatar from "../images/profile.png";
const ProfileImage = (props) => {
  const { image, tempimage } = props;
  let imageSource = avatar;
  if (tempimage) imageSource = tempimage;
  else if (image) imageSource = "images/profile/".concat(image);

  return (
    <div>
      <img
        src={imageSource}
        {...props}
        onError={(e) => (e.target.src = avatar)}
      />
    </div>
  );
};

export default ProfileImage;
