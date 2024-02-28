import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authAction from './authAction';
import Swal from "sweetalert2";

// AuthContext를 생성하고 초기값을 설정.
const AuthContext = React.createContext({
    enroll: (userId, password, userName, phone) => {}
});

// AuthContextProvider는 AuthContext의 값을 관리하는 컴포넌트.
export const AuthContextProvider = (props) => {
    // Redux의 dispatch 함수를 사용해 액션을 디스패치함.
    const dispatch = useDispatch();

    // 회원가입 성공 여부를 상태로 관리합니다.
    const [isSuccess, setIsSuccess] = useState(false);

    // 회원가입 로직을 처리하는 핸들러 함수
    const enrollHandler = (userId, password, userName, phone) => {
        setIsSuccess(false);
        const response = authAction.enrollActionHandler(userId, password, userName, phone);
        response.then((result) => {
            if(result !== null) {
                // 회원가입 성공 시 true로 상태 업데이트
                setIsSuccess(true);

                // 성공 알림 표시
                Swal.fire({
                    icon: 'success',
                    title: "가입 완료",
                    text: "가입이 완료되었습니다! 로그인 페이지로 이동합니다.",
                    confirmButtonText: "확인"}).then(function() {
                        // 로그인 페이지로 리다이렉트
                        window.location = "/login";
                })
            } else {
                Swal.fire({icon: "warning", text: "휴대폰번호가 중복되었거나 누락된 항목이 있습니다. 다시 확인해 주세요!"})
            }
        });
    };

    const contextValue = {
        isSuccess,
        enroll: enrollHandler,
    };

    return (React.createElement(AuthContext.Provider, { value: contextValue }, props.children));
}

export default AuthContext;