import React from "react";
import "./Loading.css";

const Loading = ({ fullScreen = false }) => {
    return (
        <div className={`loading ${fullScreen ? "loading--fullscreen" : ""}`}>
            <div className="loading__spinner">
                <div className="loading__spinner-inner"></div>
            </div>
            <div className="loading__text">Đang tải...</div>
        </div>
    );
};

export default Loading;
