import Swal from 'sweetalert2';
import axios from "axios";
import { postMake } from '../modules/MakeModule';

export const MakeAPI = ({ makeData, navigate }) => {
    console.log("makeData : " + makeData)
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8002/generateStory`;

    return async (dispatch, getState) => {
        await axios.post(requestURL, makeData)
            .then(function (response) {
                console.log("test",response);
                // 성공적으로 동화를 생성한 경우
                if(response.status === 200){
                    console.log("success");
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
