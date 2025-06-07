import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/common/Button";
import "./Cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart__empty">
                <h2>Giỏ hàng trống</h2>
                <p>Hãy thêm một số món ăn ngon vào giỏ hàng của bạn!</p>
                <Button variant="primary" onClick={() => navigate("/menu")}>
                    Xem thực đơn
                </Button>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart__header">
                <h2>Giỏ hàng của bạn</h2>
                <Button variant="text" onClick={clearCart}>
                    Xóa tất cả
                </Button>
            </div>

            <div className="cart__items">
                {cart.map((item) => (
                    <div key={item._id} className="cart__item">
                        <div className="cart__item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart__item-details">
                            <h3 className="cart__item-name">{item.name}</h3>
                            <p className="cart__item-price">
                                {item.discount ? (
                                    <>
                                        <span className="cart__item-price--original">{item.price.toLocaleString()}đ</span>
                                        <span className="cart__item-price--discounted">{(item.price * (1 - item.discount / 100)).toLocaleString()}đ</span>
                                    </>
                                ) : (
                                    <span>{item.price.toLocaleString()}đ</span>
                                )}
                            </p>
                        </div>
                        <div className="cart__item-quantity">
                            <Button variant="outline" size="small" onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                -
                            </Button>
                            <span className="cart__item-quantity-value">{item.quantity}</span>
                            <Button variant="outline" size="small" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                +
                            </Button>
                        </div>
                        <Button variant="text" className="cart__item-remove" onClick={() => removeFromCart(item._id)}>
                            Xóa
                        </Button>
                    </div>
                ))}
            </div>

            <div className="cart__summary">
                <div className="cart__total">
                    <span>Tổng cộng:</span>
                    <span className="cart__total-price">{getTotalPrice().toLocaleString()}đ</span>
                </div>
                <Button variant="primary" size="large" className="cart__checkout-button" onClick={() => navigate("/checkout")}>
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default Cart;
