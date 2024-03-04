import Swal from 'sweetalert2';
import axios from "axios";
import { postEnroll, postLogin } from '../modules/AuthModule';

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
                console.log(error);
                console.log("회원 가입 중 오류 발생: ", error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data, // 백엔드에서 보낸 에러 메시지를 여기에 표시
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

export const userLoginAPI = ({id, password, navigate}) => {
    const requestURL = 'http://localhost:8001/auth/login';

    return async (dispatch, getState) => {
        await axios.post(requestURL, id, password)
            .then(function (response) {
                console.log(response);
                // 성공적으로 가입 처리된 경우
                if(response.status === 200){
                    dispatch({type: postLogin, payload: response.data});
                    Swal.fire({
                        icon: 'success',
                        title: "로그인 되었습니다",
                        text: "메인화면으로 이동합니다.",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate("/", { replace: true });
                        }
                    });
                }   
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("로그인 중 오류 발생: ", error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data, // 백엔드에서 보낸 에러 메시지를 여기에 표시
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}