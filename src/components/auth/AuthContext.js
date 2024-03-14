import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// 사용자 인증 상태를 전역적으로 관리하기 위한 Context를 생성합니다. 초기 상태는 사용자 정보가 없는 상태로 설정합니다.
const AuthContext = createContext({ 
    user: null, 
    updateLoginState: () => {}, 
    loading: true // 로딩 상태 초기값은 true로 설정
 });

// 이 훅을 사용하면, 컴포넌트 내에서 쉽게 AuthContext의 값을 조회할 수 있습니다.
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider 컴포넌트는 인증 상태(로그인한 사용자 정보)를 관리하고, 해당 상태를 앱의 다른 부분과 공유합니다.
export const AuthProvider = ({ children }) => {
    // 사용자 상태를 관리하기 위한 State. 기본값은 null로, 로그인하지 않은 상태를 나타냅니다.
    const [user, setUser] = useState(null);
    // console.log("AuthContext user 1 : ", user);
    // 로딩 상태 관리를 위한 state 추가
    const [loading, setLoading] = useState(true);

    // 로컬 스토리지에서 로그인 토큰(accessToken)을 읽어와 디코딩한 후, 사용자 상태를 업데이트하는 함수입니다.
    const updateLoginState = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log("AuthContext accessToken : ", accessToken);
        if (accessToken) {
            // 토큰이 존재하면, jwtDecode를 사용해 디코딩하고 사용자 상태를 업데이트합니다.
            const decoded = jwtDecode(accessToken);
            setUser(decoded);
            // console.log("AuthContext user 2 : ", user);
        } else {
            // 토큰이 존재하지 않으면, 사용자 상태를 null로 설정해 로그아웃 상태로 만듭니다.
            setUser(null);
            // console.log("AuthContext user 3 : ", user);
        }
        // 로그인 상태 업데이트 후 로딩 상태를 false로 변경
        setLoading(false); 
    };

    // 컴포넌트가 마운트될 때(렌더링 될 때), 로그인 상태를 업데이트합니다.
    useEffect(() => {
        updateLoginState();
    }, []);

    return (
        // AuthContext.Provider를 사용해, 모든 자식 컴포넌트들에게 user 상태와 updateLoginState 함수를 전달합니다.
        <AuthContext.Provider value={{ user, updateLoginState, loading }}>
            {children}
        </AuthContext.Provider>
    );
};