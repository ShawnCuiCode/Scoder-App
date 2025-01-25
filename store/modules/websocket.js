const websocketModule = {
    namespaced: true,
    state: {
        socket: null, // WebSocket instance
        isConnected: false, // WebSocket connection status
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,
    },
    mutations: {
        setSocket(state, socket) {
            state.socket = socket;
        },
        setConnectionStatus(state, status) {
            state.isConnected = status;
        },
        setReconnectAttempts(state, attempts) {
            state.reconnectAttempts = attempts;
        },
    },
    actions: {
        /**
         * Initialize WebSocket connection
         */
        initWebSocket({commit, dispatch, state}, userId) {
            // Ensure any existing socket is closed
            if (state.socket) {
                state.socket.close();
            }

            const socket = uni.connectSocket({
                url: "ws://scoder.co.uk:58080/webSocket",
                success: () => {
                    console.log("WebSocket connection initiated");
                },
                fail: (err) => {
                    console.error("Failed to initiate WebSocket connection:", err);
                },
            });

            // Bind WebSocket events
            socket.onOpen(() => {
                console.log("WebSocket connected");
                commit("setConnectionStatus", true);
                commit("setReconnectAttempts", 0); // 重连成功后清零

                // Send login message
                const loginMessage = JSON.stringify({
                    type: "LOGIN",
                    userId,
                });

                socket.send({
                    data: loginMessage,
                    success: () => console.log("Login message sent"),
                    fail: (err) => console.error("Failed to send login message:", err),
                });
            });

            socket.onMessage((res) => {
                console.log("Global WebSocket message received:", res);
                try {
                    const parsedMsg = JSON.parse(res.data);
                    if (parsedMsg.type === "DIRECT") {
                        uni.$emit("direct-message", parsedMsg);
                    }
                    if (parsedMsg.type === "GROUP") {
                        uni.$emit("group-message", parsedMsg);
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            });

            socket.onClose(() => {
                console.log("WebSocket connection closed");
                commit("setConnectionStatus", false);
                if (state.reconnectAttempts < state.maxReconnectAttempts) {
                    dispatch("reconnectWebSocket", userId);
                } else {
                    console.error("Max reconnect attempts reached. Stop reconnecting.");
                    uni.showToast({
                        title: "Unable to reconnect. Please check your network.",
                        icon: "none",
                    });
                }
            });

            socket.onError((err) => {
                console.error("WebSocket error:", err);
                commit("setConnectionStatus", false);
            });

            commit("setSocket", socket);
        },

        /**
         * Reconnect WebSocket with delay and limit
         */
        reconnectWebSocket({state, commit, dispatch}, userId) {
            const {reconnectAttempts, maxReconnectAttempts} = state;

            if (reconnectAttempts >= maxReconnectAttempts) {
                console.error("Max reconnect attempts reached. Stop reconnecting.");
                return;
            }

            const reconnectDelay = 5000;
            console.log(`Reconnecting in ${reconnectDelay / 1000} seconds...`);

            commit("setReconnectAttempts", reconnectAttempts + 1);

            setTimeout(() => {
                console.log(`Reconnect attempt #${state.reconnectAttempts}`);
                dispatch("initWebSocket", userId);
            }, reconnectDelay);
        },

        /**
         * Send a message through WebSocket
         */
        sendMessage({state}, message) {
            if (state.socket && state.isConnected) {
                state.socket.send({
                    data: JSON.stringify(message),
                    success: () => console.log("Message sent successfully"),
                    fail: (err) => console.error("Failed to send message:", err),
                });
            } else {
                console.error("WebSocket is not connected. Cannot send message.");
            }
        },
    },
};

export default websocketModule;
