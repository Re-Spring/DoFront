import Swal from 'sweetalert2';
import axios from 'axios';
import { postClone } from "../modules/VoiceModule";

// 비동기 액션 생성자
export const voiceCloningAPI = ({formData, setIsLoading}) => {
    console.log("API에서 formdata 확인 : ", formData);
    for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
    }
    for (let value of formData.values()) {
        console.log(value);
    }
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8002/voiceCloning`;

    return async (dispatch) => {
        await axios.post(requestURL, formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // 명시적으로 Content-Type 설정
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    dispatch(postClone(response.data));
                    localStorage.setItem('tempVoiceCode', response.data.userVoiceId);
                    setIsLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: "목소리가 등록되었습니다",
                        text: "이제 동화를 등록한 목소리로 들을 수 있습니다. 즐링!",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            window.location.reload();;
                        }
                    });
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("목소리 등록 API에서 오류 발생: ", error);
                console.log("목소리 등록 API 백에서 오류 발생: ", error.response);
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: "목소리 등록 시도 중 오류가 발생했습니다",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.reload();;
                    }
                });
            });
    }
};
