import axios from 'axios';
import Swal from 'sweetalert2';
import { getUserStory } from '../modules/StoryModule';

// StoryAPI 함수의 수정된 버전
export const fetchFairytales = async () => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/fairytales`;
    try {
        const response = await axios.get(requestURL);
        if (response.status === 200) {
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: error.response.data, // 백엔드에서 보낸 에러 메시지를 여기에 표시
            text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
            confirmButtonText: "확인"
        });
    }
};

// 사용자 이야기 호출 액션
export const callUserStoryAPI = (genreInEnglish) => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/stories/genre/${genreInEnglish}`;

    return async (dispatch) => {
        try {
            const response = await axios.get(requestURL);
            if (response.status === 200) {
                dispatch(getUserStory(response.data));
            }
        } catch (error) {
            console.error("불러오는 중 에러:", error.response);
            const errorMessage = error.response.status === 400 ? error.response.data : "가입 시도 중 오류가 발생했습니다";
            Swal.fire({
                icon: 'error',
                title: errorMessage,
                text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                confirmButtonText: "확인"
            });
        }
    };
};