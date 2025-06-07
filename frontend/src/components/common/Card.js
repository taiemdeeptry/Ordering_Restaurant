import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Card.css";

const Card = ({ image, title, description, price, discount, isSpecial = false, isAvailable = true, className, children, ...props }) => {
    const cardClasses = classNames(
        "card",
        {
            "card--special": isSpecial,
            "card--unavailable": !isAvailable,
        },
        className
    );

    const finalPrice = discount ? price * (1 - discount / 100) : price;

    return (
        <div className={cardClasses} {...props}>
            <div className="card__image-container">
                <img src={image} alt={title} className="card__image" />
                {isSpecial && <span className="card__special-badge">Đặc biệt</span>}
                {!isAvailable && <span className="card__unavailable-badge">Hết hàng</span>}
            </div>
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                {description && <p className="card__description">{description}</p>}
                <div className="card__price-container">
                    {discount ? (
                        <>
                            <span className="card__price--original">{price.toLocaleString()}đ</span>
                            <span className="card__price--discounted">{finalPrice.toLocaleString()}đ</span>
                        </>
                    ) : (
                        <span className="card__price">{price.toLocaleString()}đ</span>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    isSpecial: PropTypes.bool,
    isAvailable: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Card;
