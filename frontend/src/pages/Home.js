import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "../context/TableContext";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const { selectedTable } = useTable();

    const handleOrderNow = () => {
        // if (!selectedTable) {
        //     alert("Vui lòng chọn bàn trước khi đặt món!");
        //     return;
        // }
        navigate("/menu");
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="home__hero">
                <div className="home__hero-overlay"></div>
                <div className="home__hero-content">
                    <h1 className="home__hero-title">Taste of Harmony</h1>
                    <p className="home__hero-subtitle">Hương vị hòa quyện, trải nghiệm đỉnh cao</p>
                    <p className="home__hero-description">Nơi hòa quyện giữa nghệ thuật ẩm thực và không gian tinh tế, mang đến cho bạn những trải nghiệm ẩm thực đích thực</p>
                    <button className="home__hero-button" onClick={handleOrderNow}>
                        Đặt món ngay
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="home__features">
                <div className="home__features-container">
                    <h2 className="home__features-title">Trải Nghiệm Độc Đáo</h2>
                    <div className="home__features-grid">
                        <div className="home__feature-card">
                            <div className="home__feature-icon-container">
                                <img src="https://img.icons8.com/fluency/96/ingredients.png" alt="Nguyên liệu" className="home__feature-icon" />
                            </div>
                            <div className="home__feature-content">
                                <h3 className="home__feature-title">Nguyên Liệu Tuyển Chọn</h3>
                                <p className="home__feature-description">
                                    Chúng tôi cam kết sử dụng các nguyên liệu tươi ngon nhất, được tuyển chọn kỹ lưỡng từ các nhà cung cấp uy tín để tạo nên những món ăn đầy hương vị.
                                </p>
                            </div>
                        </div>

                        <div className="home__feature-card">
                            <div className="home__feature-icon-container">
                                <img src="https://img.icons8.com/fluency/96/chef-hat.png" alt="Đầu bếp" className="home__feature-icon" />
                            </div>
                            <div className="home__feature-content">
                                <h3 className="home__feature-title">Đầu Bếp Đẳng Cấp</h3>
                                <p className="home__feature-description">
                                    Đội ngũ đầu bếp giàu kinh nghiệm của chúng tôi luôn sáng tạo không ngừng để mang đến những món ăn độc đáo, kết hợp giữa truyền thống và hiện đại.
                                </p>
                            </div>
                        </div>

                        <div className="home__feature-card">
                            <div className="home__feature-icon-container">
                                <img src="https://img.icons8.com/fluency/96/dining-room.png" alt="Không gian" className="home__feature-icon" />
                            </div>
                            <div className="home__feature-content">
                                <h3 className="home__feature-title">Không Gian Sang Trọng</h3>
                                <p className="home__feature-description">
                                    Không gian nhà hàng được thiết kế tinh tế, mang đến cảm giác ấm cúng và sang trọng, là nơi lý tưởng cho những buổi tụ họp gia đình hay những cuộc hẹn lãng mạn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="home__testimonial">
                <div className="home__testimonial-container">
                    <h2 className="home__testimonial-title">Khách Hàng Nói Gì</h2>
                    <div className="home__testimonial-content">
                        <p className="home__testimonial-quote">
                            "Taste of Harmony mang đến cho tôi trải nghiệm ẩm thực tuyệt vời nhất. Không chỉ món ăn ngon, không gian đẹp mà còn có dịch vụ chuyên nghiệp. Đây là nơi tôi luôn muốn quay
                            lại mỗi khi có dịp đặc biệt."
                        </p>
                        <p className="home__testimonial-author">- Nguyễn Đức Huy -</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
