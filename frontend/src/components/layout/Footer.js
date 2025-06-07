import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__section">
                    <h3 className="footer__title">Restaurant Ordering</h3>
                    <p className="footer__description">Hệ thống đặt món trực tuyến hiện đại, tiện lợi và nhanh chóng.</p>
                </div>

                <div className="footer__section">
                    <h3 className="footer__title">Liên kết nhanh</h3>
                    <ul className="footer__links">
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/menu">Thực đơn</Link>
                        </li>
                        <li>
                            <Link to="/cart">Giỏ hàng</Link>
                        </li>
                        <li>
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h3 className="footer__title">Liên hệ</h3>
                    <ul className="footer__contact">
                        <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
                        <li>Điện thoại: (84) 123-456-789</li>
                        <li>Email: info@restaurant.com</li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h3 className="footer__title">Theo dõi chúng tôi</h3>
                    <div className="footer__social">
                        <a href="#" className="footer__social-link">
                            Facebook
                        </a>
                        <a href="#" className="footer__social-link">
                            Instagram
                        </a>
                        <a href="#" className="footer__social-link">
                            Twitter
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} Restaurant Ordering. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
