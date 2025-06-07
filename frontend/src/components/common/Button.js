import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Button.css";

const Button = ({ children, variant = "primary", size = "medium", fullWidth = false, disabled = false, loading = false, className, ...props }) => {
    const buttonClasses = classNames(
        "button",
        `button--${variant}`,
        `button--${size}`,
        {
            "button--full-width": fullWidth,
            "button--disabled": disabled,
            "button--loading": loading,
        },
        className
    );

    return (
        <button className={buttonClasses} disabled={disabled || loading} {...props}>
            {loading ? (
                <span className="button__loader">
                    <span className="button__loader-dot"></span>
                    <span className="button__loader-dot"></span>
                    <span className="button__loader-dot"></span>
                </span>
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "secondary", "outline", "text"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
