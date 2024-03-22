import Swal from 'sweetalert2';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { getExpVoice, posdtDeleteVoice } from '../modules/AdminModule';

export function expiredVoiceAPI(){
    const requestURL = `http://${process.env.REACT_APP_API_IP}/expVoice`;

    return async (dispatch, getState) => {
        await axios.get(requestURL)
            .then(function (response) {
                console.log('[AdminAPI] expiredVoiceAPI RESPONSE : ', response);
                if(response.status == 200) {
                    dispatch(getExpVoice(response.data));
                }
            })
            .catch(function(error) {
            console.error('AdminAPI expiredVoiceAPI 에러 발생 : ', error);
            })
    }
}

export function deleteVoiceAPI(voiceId){

    const requestURL = 'http://${process.env.REACT_APP_API_IP}:8002/deleteVoice'
    console.log('[AdminAPI] deleteVoiceAPI voiceId : ', voiceId)
    const body = { voiceId: voiceId };

    return async (dispatch, getState) => {
        await axios.post(requestURL, body)
            .then(function (response) {
                console.log('[AdminAPI] deleteVoiceAPI RESPONSE : ', response);
                if(response.status === 200){
                    dispatch(posdtDeleteVoice(response.data));
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
                console.error('AdminAPI deleteVoiceAPI 에러 발생 : ', error);
                Swal.fire({
                    icon: 'error',
                    title: "보이스아이디 삭제 중 오류 발생",
                    text: error.response.message
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.reload();;
                    }
                })
            });
    }
}