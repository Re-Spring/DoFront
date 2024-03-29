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

    // 로딩 상태 관리를 위한 state 추가
    const [loading, setLoading] = useState(true);

    const updateLoginState = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log("AuthContext accessToken : ", accessToken);
        if (accessToken) {
            const decoded = jwtDecode(accessToken); // 수정된 함수 사용
            setUser(decoded);
            // console.log("AuthContext user 2 : ", user);
        } else {
            setUser(null);
            // console.log("AuthContext user 3 : ", user);
        }
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tempVoiceCode');
        window.location.reload(); // 페이지 새로고침
        setUser(null);
        
    };

    const checkTokenExpiration = () => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
            if ( decodedToken.exp < currentTime ) {
                logout(); // 토큰 만료 시 로그아웃 실행
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(checkTokenExpiration, 60000); // 1분마다 토큰 만료 여부 검사
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
      }, []);

    useEffect(() => {
        updateLoginState();
    }, []);

    return (
        <AuthContext.Provider value={{ user, updateLoginState, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
