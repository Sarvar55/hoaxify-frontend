import React from "react";

function ButtonWithProgres(props) {
  const { onClick, pendingApiCall, disabled, text, className } = props;

  return (
    <button
      disabled={disabled}
      className={!className ? "btn btn-success mt-2 w-25 h-50 px-3" : className}
      onClick={onClick}
      type="submit"
    >
      {pendingApiCall && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {text}
    </button>
  );
}

export default ButtonWithProgres;
