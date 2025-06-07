import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Input.css";

const Input = ({ type = "text", label, name, value, onChange, placeholder, error, disabled = false, required = false, className, ...props }) => {
    const inputClasses = classNames(
        "input",
        {
            "input--error": error,
            "input--disabled": disabled,
        },
        className
    );

    return (
        <div className="input__container">
            {label && (
                <label htmlFor={name} className="input__label">
                    {label}
                    {required && <span className="input__required">*</span>}
                </label>
            )}
            <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className={inputClasses} {...props} />
            {error && <span className="input__error-message">{error}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password", "number", "tel"]),
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
};

export default Input;
