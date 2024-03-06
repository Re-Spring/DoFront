// // 회원가입 프론트 갈아엎기 전

// import {GET, POST} from "../../apis/AuthAPI";

// // 회원가입 요청을 처리하는 함수
// export const enrollActionHandler = (userId, password, userName, phone) => {
//     // 회원가입 API의 엔드포인트
//     const URL = '/auth/enroll';
//     // 요청 본문
//     const enrollObject = {userId, password, userName, phone};
//     // POST 요청
//     const response = POST(URL, enrollObject, {});
//     // 응답 반환
//     return response;
// };