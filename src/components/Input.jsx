import React from "react";

const Input = (props) => {
  const { label, error, name, onChange, type, defaultValue } = props;
  let className = "form-control";
  if (type == "file") {
    className = "-file";
  }
  if (error) {
    className += " is-invalid";
  }
  return (
    <div className="form-group mb-2">
      <label htmlFor="userName">{label}</label>
      <input
        className={className}
        name={name}
        id="userName"
        type={type}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
