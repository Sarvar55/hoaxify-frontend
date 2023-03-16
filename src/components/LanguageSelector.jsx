import React from "react";
import turkey from "../images/turkey.png";
import usa from "../images/united-states-of-america.png";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const onChangeLanguange = (languange) => {
    i18n.changeLanguage(languange);
    changeLanguage(languange);
  };

  return (
    <div>
      <img
        src={turkey}
        alt="Turkey Flag"
        className="mx-1 pointer-event cursor"
        id="tr"
        onClick={(e) => onChangeLanguange(e.target.id)}
      />
      <img
        src={usa}
        alt="USA Flag"
        className="mx-1 cursor"
        id="en"
        onClick={(e) => onChangeLanguange(e.target.id)}
      />
    </div>
  );
};
export default LanguageSelector;
