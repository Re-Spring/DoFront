import Swal from 'sweetalert2';
import axios from "axios";
import { postEnroll, postLogin } from '../modules/AuthModule';
import { jwtDecode } from 'jwt-decode';


export const userEnrollAPI = ({userData, navigate}) => {
    const requestURL = 'http://localhost:8001/auth/enroll';

    return async (dispatch, getState) => {
        await axios.post(requestURL, userData)
            .then(function (response) {
                console.log(response);
                // 성공적으로 가입 처리된 경우
                if(response.status === 200){
                    // 액션 생성자 함수를 호출하여 액션 객체 생성 및 디스패치
                    dispatch(postEnroll(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "가입 완료",
                        text: "가입이 완료되었습니다! 로그인 페이지로 이동합니다.",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate("/login", { replace: true });
                        }
                    });
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("회원 가입 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "가입 시도 중 오류가 발생했습니다",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

export const userLoginAPI = ({userId, password, navigate}) => {
    const requestURL = 'http://localhost:8001/auth/login';
    console.log("api 전 : ", userId, password);
    return async (dispatch, getState) => {
        await axios.post(requestURL, {userId, password}, 
            {
                headers: {
                    'Content-Type': 'application/json' // 명시적으로 Content-Type 설정
                }
            })
            .then(function (response) {
                console.log(response);
                // 성공적으로 로그인 처리된 경우
                if(response.status === 200){
                    // 토큰을 상태로 저장하거나 로컬/세션 스토리지에 저장하는 로직 추가
                    const accessToken = response.data.accessToken;
                    // 로컬 스토리지에 토큰 저장
                    localStorage.setItem('accessToken', accessToken);
                    console.log("토큰 확인 : ", accessToken);
                    console.log("토큰 디코딩 확인 : ", jwtDecode(accessToken));
                    // 상태 업데이트
                    dispatch(postLogin(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "로그인 되었습니다",
                        text: "메인화면으로 이동합니다.",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate("/", { replace: true });
                            // 로그인 성공 이벤트 발생
                            window.dispatchEvent(new CustomEvent("loginSuccess"));
                            // 헤더 수정에 너무 많은 시간이 소요되고 있는 까닭으로 navigate 직후 새로고침을 실행하는 편법을 사용했습니다. 테스트 기간에 고칠게요........
                            // navigate 후에 페이지 새로고침
                            setTimeout(() => {
                                window.location.reload();
                            }, 100); // 100ms 후에 페이지를 새로고침합니다. 이 값은 조정 가능합니다.
                        }
                    });
                }   
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("로그인 중 오류 발생: ", error);
                console.log("로그인 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "로그인 시도 중 오류가 발생했습니다",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}