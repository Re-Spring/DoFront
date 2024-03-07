// // 회원가입 프론트 갈아엎기 전

// import axios from 'axios';
// import Swal from "sweetalert2";

// const DOMAIN = 'http://192.168.0.172:8001'

// // HTTP 요청을 추상화한 함수
// const fetchAuth = async (fetchData) => {
//     const method = fetchData.method;
//     const url = `${DOMAIN}${fetchData.url}`;
//     const data = fetchData.data;
//     const header = fetchData.header;

//     try {
//         // HTTP 메소드에 따라 적절한 axios 함수를 호출
//         const response = (method === 'get' && (await axios.get(url, header))) ||
//             (method === 'post' && (await axios.post(url, data, header))) ||
//             (method === 'put' && (await axios.put(url, data, header))) ||
//             (method === 'delete' && (await axios.delete(url, header)));
//         // 에러 처리
//         if (response && response.data.error) {
//             console.log(response.data.error);
//             return null;
//         }
//         if (!response) {
//             console.log("응답 오류 발생");
//             return null;
//         }
//         // 성공적인 응답 반환
//         return response;
//     }
//     // 에러 로깅
//     catch (error) {
//         console.log(error);
//         Swal.fire({icon: "error", text: "기타 오류"});
//         return null;
//     }
// }

// // GET 요청을 보내는 함수
// const GET = (url, header) => {
//     const response = fetchAuth({method: 'get', url, header});
//     return response
// };

// // POST 요청을 보내는 함수
// const POST = (url, data, header) => {
//     const response = fetchAuth({method: 'post', url, data, header});
//     return response;
// };

// export {GET, POST};