import Swal from 'sweetalert2';
import axios from "axios";
import { postMake } from '../modules/MakeModule';

export const Voice = ({ makeData }) => {
    const requestURL = 'http://localhost:8002/generateStory';

    return async (dispatch, getState) => {
        await axios.post(requestURL, makeData)
            .then(function (response) {
                console.log(response);
                // 성공적으로 동화를 생성한 경우
                if(response.status === 200){
                    // 액션 생성자 함수를 호출하여 액션 객체 생성 및 디스패치
                    dispatch(postMake(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "동화 생성이 완료되었습니다.",
                        text: "즐거운 동화 감상하세요!",
                        confirmButtonText: "O"
                    }).then(result => {
                        if(result.isConfirmed){
//                            navigate("/Create", { replace: true });
                        }
                    });
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data, // 백엔드에서 보낸 에러 메시지를 여기에 표시
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}