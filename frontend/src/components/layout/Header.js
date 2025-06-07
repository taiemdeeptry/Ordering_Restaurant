import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Header.css";

const Header = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    Restaurant Ordering
                </Link>

                <nav className="header__nav">
                    <Link to="/" className="header__nav-item">
                        Trang chủ
                    </Link>
                    <Link to="/menu" className="header__nav-item">
                        Thực đơn
                    </Link>
                    {user && (
                        <>
                            <Link to="/cart" className="header__nav-item">
                                Giỏ hàng
                                {getTotalItems() > 0 && <span className="header__cart-badge">{getTotalItems()}</span>}
                            </Link>
                            {user.role === "admin" && (
                                <Link to="/admin" className="header__nav-item">
                                    Quản lý
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                <div className="header__user">
                    {user ? (
                        <div className="header__user-menu">
                            <span className="header__user-name">{user.name}</span>
                            <button onClick={handleLogout} className="header__logout-btn">
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="header__auth-buttons">
                            <Link to="/login" className="header__login-btn">
                                Đăng nhập
                            </Link>
                            <Link to="/register" className="header__register-btn">
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
