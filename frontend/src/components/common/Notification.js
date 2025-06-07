import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { websocketService } from "../../services/websocket";

const Notification = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const handleNewOrder = (order) => {
            toast.info(`Có đơn hàng mới #${order._id}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };

        const handleOrderStatusChange = (order) => {
            toast.info(`Đơn hàng #${order._id} đã được cập nhật: ${order.status}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };

        // Kiểm tra xem WebSocket đã kết nối chưa
        if (websocketService.socket && websocketService.socket.readyState === WebSocket.OPEN) {
            setIsConnected(true);
            websocketService.subscribe("new_order", handleNewOrder);
            websocketService.subscribe("order_status_change", handleOrderStatusChange);
        }

        return () => {
            if (isConnected) {
                websocketService.unsubscribe("new_order", handleNewOrder);
                websocketService.unsubscribe("order_status_change", handleOrderStatusChange);
            }
        };
    }, [isConnected]);

    return null;
};

export default Notification;
