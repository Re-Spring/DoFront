import axios from 'axios';
import Swal from 'sweetalert2';

// StoryAPI 함수의 수정된 버전
export const fetchFairytales = async () => {
    const requestURL = 'http://192.168.0.172:8001/fairytales';
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
