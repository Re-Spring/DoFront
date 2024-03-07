import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Context 생성
const AuthContext = createContext();

// Context를 사용하기 쉽게 하는 Custom Hook
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider 컴포넌트는 로그인 상태를 관리하고 해당 상태를 앱의 다른 부분과 공유하는 역할
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 로컬 스토리지에서 로그인 상태를 읽어와서 업데이트하는 함수
    const updateLoginState = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUser(decoded);
        } else {
            setUser(null);
        }
    };

    // 컴포넌트가 마운트될 때 로그인 상태를 업데이트
    useEffect(() => {
        updateLoginState();
    }, []);

    return (
        // 모든 자식 컴포넌트들에게 user 상태와 updateLoginState 함수를 제공
        <AuthContext.Provider value={{ user, updateLoginState }}>
            {children}
        </AuthContext.Provider>
    );
};