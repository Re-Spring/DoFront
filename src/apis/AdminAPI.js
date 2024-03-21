import Swal from 'sweetalert2';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { deleteDeleteVoice, getExpVoice } from '../modules/AdminModule';

export function expiredVoiceAPI(){
    const requestURL = 'http://localhost:8001/expVoice';

    return async (dispatch, getState) => {
        await axios.get(requestURL)
            .then(function (response) {
                console.log('[AdminAPI] expiredVoiceAPI RESPONSE : ', response);
                if(response.status === 200) {
                    dispatch(getExpVoice(response.data));
                }
            })
            .catch(function(error) {
            console.error('AdminAPI expiredVoiceAPI 에러 발생 : ', error);
            })
    }
}

export function deleteVoiceAPI(voiceId){
    const requestURL = `http://localhost:8001/deleteVoice/${voiceId}`

    return async (dispatch, getState) => {
        await axios.delete(requestURL)
            .then(function (response) {
                console.log('[AdminAPI] deleteVoiceAPI RESPONSE : ', response);
                if(response.status === 200){
                    dispatch(deleteDeleteVoice(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "삭제 완료",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            window.location.reload();;
                        }
                    });
                }
            })
            .catch(function (error) {
                console.error('AdminAPI expiredVoiceAPI 에러 발생 : ', error);
                Swal.fire({
                    icon: 'error',
                    title: "보이스아이디 삭제 중 오류 발생",
                    text: error.response.data
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.reload();;
                    }
                })
            });
    }
}