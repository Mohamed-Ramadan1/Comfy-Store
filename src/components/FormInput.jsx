import React from "react";

const FormInput = ({ name, type, label, defualtValue }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        className="input input-bordered w-full max-w-xs"
        defaultValue={defualtValue}
      />
    </div>
  );
};

export default FormInput;
