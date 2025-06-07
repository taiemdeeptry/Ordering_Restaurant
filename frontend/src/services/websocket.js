class WebSocketService {
    constructor() {
        this.socket = null;
        this.subscribers = {};
        this.connect();
    }

    connect() {
        this.socket = new WebSocket(process.env.REACT_APP_WS_URL || "ws://localhost:5000");

        this.socket.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const { type, payload } = data;

            if (this.subscribers[type]) {
                this.subscribers[type].forEach((callback) => callback(payload));
            }
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected");
            // Try to reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter((cb) => cb !== callback);
        }
    }

    send(event, data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type: event, payload: data }));
        }
    }
}

export const websocketService = new WebSocketService();
