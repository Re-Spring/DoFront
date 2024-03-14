import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // 수정된 import 문

const AuthContext = createContext({
    user: null,
    updateLoginState: () => {},
    logout: () => {}, // 로그아웃 함수 추가
    loading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateLoginState = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decoded = jwtDecode(accessToken); // 수정된 함수 사용
            setUser(decoded);
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    useEffect(() => {
        updateLoginState();
    }, []);

    return (
        <AuthContext.Provider value={{ user, updateLoginState, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
