import Swal from 'sweetalert2';
import axios from "axios";
import { POST_ENROLL } from '../modules/AuthModule';

export const userEnrollAPI = ({userData, navigate}) => {
    const requestURL = 'http://localhost:8001/auth/enroll';

    return async (dispatch, getState) => {
        await axios.post(requestURL, userData)
            .then(function (response) {
                console.log(response);
                console.log(response.headers);
                // 성공적으로 가입 처리된 경우
                if(response.status === 200){
                    dispatch({type: POST_ENROLL, payload: response.data});
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
                console.log("회원 가입 중 오류 발생: ", error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: "가입 실패",
                    text: error.response.data, // 백엔드에서 보낸 에러 메시지를 여기에 표시
                    confirmButtonText: "확인"
                });
            });
    }
}