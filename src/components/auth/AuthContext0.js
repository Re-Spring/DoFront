// // 회원가입 프론트 갈아엎기 전

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import * as authAction from './authAction';
// import Swal from "sweetalert2";

// // AuthContext를 생성하고 초기값을 설정.
// const AuthContext = React.createContext({
//     enroll: (userId, password, userName, phone) => { },
// });

// // AuthContextProvider는 AuthContext의 값을 관리하는 컴포넌트.
// export const AuthContextProvider = (props) => {
//     // Redux의 dispatch 함수를 사용해 액션을 디스패치함.
//     const dispatch = useDispatch();

//     // 회원가입 성공 여부를 상태로 관리합니다.
//     const [isSuccess, setIsSuccess] = useState(false);

//     // 회원가입 로직을 처리하는 핸들러 함수
//     const enrollHandler = async (userId, password, userName, phone) => {
//         setIsSuccess(false);
//         try {
//             const result = await authAction.enrollActionHandler(userId, password, userName, phone);
//             if(result !== null && result.status === 200){
//                 // 회원가입 성공 시 true로 상태 업데이트
//                 setIsSuccess(true);
//                 // 성공 알림 표시
//                 Swal.fire({
//                     icon: 'success',
//                     title: "가입 완료",
//                     text: "가입이 완료되었습니다! 로그인 페이지로 이동합니다.",
//                     confirmButtonText: "확인"
//                 });
//                 // 성공을 나타내는 값 반환
//                 return true;
//             } else {
//                 // 실패 시 에러 메시지 표시
//                 Swal.fire({ icon: 'error', text: "알 수 없는 오류가 발생했습니다. 문제가 지속될 시 고객센터로 문의해 주세요." });
//             }
//         } catch (error) {
//             console.error('가입 과정에서 오류 발생 : ', error);
//             Swal.fire({icon: 'error', text: "알 수 없는 오류가 발생했습니다. 문제가 지속될 시 고객센터로 문의해 주세요."});
//             // 예외 발생 시 실패를 나타내는 값 반환
//             return false;
//         }
//     };

//     // const contextValue = {
//     //     isSuccess,
//     //     enroll: enrollHandler,
//     // };
//     const contextValue = {
//         enroll: enrollHandler,
//     };

//     // return (React.createElement(AuthContext.Provider, { value: contextValue }, props.children));
//     return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
// }

// export default AuthContext;