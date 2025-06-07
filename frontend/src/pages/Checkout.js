import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import "./Checkout.css";

const Checkout = () => {
    const [formData, setFormData] = useState({
        tableNumber: "",
        notes: "",
        paymentMethod: "cash",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (cart.length === 0) {
            navigate("/cart");
            return;
        }
    }, [user, cart, navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.tableNumber.trim()) {
            newErrors.tableNumber = "Vui lòng nhập số bàn";
        } else if (!/^\d+$/.test(formData.tableNumber)) {
            newErrors.tableNumber = "Số bàn phải là số";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                items: cart.map((item) => ({
                    menuItem: item._id,
                    quantity: item.quantity,
                    price: item.discountPrice || item.price,
                })),
                tableNumber: parseInt(formData.tableNumber),
                notes: formData.notes,
                paymentMethod: formData.paymentMethod,
                total: cart.reduce((total, item) => {
                    const price = item.discountPrice || item.price;
                    return total + price * item.quantity;
                }, 0),
            };

            await orderService.create(orderData);
            clearCart();
            navigate("/order-success");
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                submit: error.message,
            }));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="checkout">
            <h1 className="checkout__title">Thanh toán</h1>
            <div className="checkout__container">
                <form className="checkout__form" onSubmit={handleSubmit}>
                    <div className="checkout__section">
                        <h2>Thông tin đơn hàng</h2>
                        <Input label="Số bàn" name="tableNumber" value={formData.tableNumber} onChange={handleChange} error={errors.tableNumber} required />
                        <Input label="Ghi chú" name="notes" value={formData.notes} onChange={handleChange} multiline />
                    </div>

                    <div className="checkout__section">
                        <h2>Phương thức thanh toán</h2>
                        <div className="checkout__payment-methods">
                            <label className="checkout__payment-method">
                                <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === "cash"} onChange={handleChange} />
                                <span>Tiền mặt</span>
                            </label>
                            <label className="checkout__payment-method">
                                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleChange} />
                                <span>Thẻ</span>
                            </label>
                        </div>
                    </div>

                    {errors.submit && <div className="checkout__error">{errors.submit}</div>}

                    <Button type="submit" variant="primary" fullWidth loading={loading} disabled={loading}>
                        Đặt hàng
                    </Button>
                </form>

                <div className="checkout__order-summary">
                    <h2>Đơn hàng của bạn</h2>
                    <div className="checkout__items">
                        {cart.map((item) => (
                            <div key={item._id} className="checkout__item">
                                <div className="checkout__item-details">
                                    <span className="checkout__item-name">{item.name}</span>
                                    <span className="checkout__item-quantity">x {item.quantity}</span>
                                </div>
                                <span className="checkout__item-price">{(item.discountPrice || item.price) * item.quantity}đ</span>
                            </div>
                        ))}
                    </div>
                    <div className="checkout__total">
                        <span>Tổng cộng:</span>
                        <span>
                            {cart.reduce((total, item) => {
                                const price = item.discountPrice || item.price;
                                return total + price * item.quantity;
                            }, 0)}
                            đ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
