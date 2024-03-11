import Swal from 'sweetalert2';
import axios from 'axios';
import { postVoice } from "../modules/VoiceModule";

// 비동기 액션 생성자
export const callVoiceCloningAPI = (voiceData) => async (dispatch) => {
    console.log(voiceData.get('audio_data'));
    const requestURL = 'http://localhost:8002/voiceCloning';

    try {
        const response = await axios.post(requestURL, voiceData);

        console.log(response);
        if (response.status === 200) {
            // 성공 액션 디스패치, postVoice 액션 생성자를 사용
            dispatch(postVoice(response.data));
            
            // 추가적인 성공 처리 (예: SweetAlert2 사용)
            Swal.fire({
                icon: 'success',
                title: '음성 녹음이 완료되었습니다.',
                text: '즐거운 감상하세요!',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    // 성공 후 처리, 예: 페이지 이동
                    // navigate('/Create', { replace: true });
                }
            });
        }
    } catch (error) {
        console.error(error);

        // 실패 처리, 여기에서는 단순 에러 메시지를 보여주고 있습니다.
        // 실패에 대한 상태 업데이트가 필요한 경우, 별도의 액션을 정의하고 사용할 수 있습니다.
        Swal.fire({
            icon: 'error',
            title: error.response?.data || '오류 발생',
            text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
            confirmButtonText: '확인',
        });
    }
};
