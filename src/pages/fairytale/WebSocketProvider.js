import { useState, useEffect } from 'react';

// 커스텀 훅으로 변경
export const useWebSocket = (socketUrl) => {
    const [socket, setSocket] = useState(null);
    const [readyState, setReadyState] = useState(WebSocket.CLOSED);

    useEffect(() => {
        const newSocket = new WebSocket(socketUrl);
        setSocket(newSocket);

        newSocket.onopen = () => {
            setReadyState(newSocket.readyState);
        };

        return () => {
            newSocket.close();
        };
    }, [socketUrl]);

    const sendMessage = (data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        }
    };

    return { sendMessage, readyState };
};
