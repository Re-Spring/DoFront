import React, { useState, useRef, useEffect } from 'react';
import '../../styles/voice/Voice.css';
import { useDispatch } from 'react-redux';
import { callVoiceCloningAPI } from '../../apis/VoiceAPI';

function Voice() {
    const [chunks, setChunks] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');
    const [userId, setUserId] = useState('');
    const mediaRecorder = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const audioElement = document.getElementById('audioPlayback');
        audioElement.src = audioUrl || '';
        audioElement.style.display = audioUrl ? 'block' : 'none';
    }, [audioUrl]);

    const startRecording = () => {
        if (isRecording) return;
        
        setIsRecording(true);
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaRecorder.current = new MediaRecorder(stream);
            const localChunks = [];
            
            mediaRecorder.current.ondataavailable = e => localChunks.push(e.data);
            mediaRecorder.current.onstop = async () => {
                const blob = new Blob(localChunks, { 'type': 'audio/wav' });
                setAudioUrl(URL.createObjectURL(blob));

                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    sessionStorage.setItem('audio', reader.result);
                };
                setIsRecording(false);
            };

            mediaRecorder.current.start();
            setTimeout(() => mediaRecorder.current.stop(), 20000);
        }).catch(err => {
            console.error('An error occurred: ', err);
            setIsRecording(false);
        });
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
    };
    const playRecording = () => {
        const base64audio = sessionStorage.getItem('audio');
        if (base64audio) setAudioUrl(base64audio);
        else console.log('No saved audio found in session storage.');
    };

    const saveRecording = () => {
        const base64audio = sessionStorage.getItem('audio');
        if (!base64audio) {
            console.log('No audio data to save.');
            return;
        }

        const formData = new FormData();
        formData.append('audio_data', dataURLtoBlob(base64audio)); // Base64 인코딩된 오디오 데이터를 Blob으로 변환하고 추가
        formData.append('user_id', userId); // 사용자 ID 추가
        console.log("폼데이터 ",formData);

        dispatch(callVoiceCloningAPI(
            formData
            )); // 비동기 액션 생성자를 호출하여 API 요청
    };

    // Base64 인코딩된 문자열을 Blob 객체로 변환하는 함수
    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type: mime });
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };
    return (
    <>
    <div>
        <h1>목소리 등록</h1>
            <h3>안내 사항</h3>
                <div className='infoBox'> 
                        목소리 등록을 위해 총 3개의 구절을 녹음해주세용~
                        녹음은 가능한 잡음이 적은 환경에서 해주세용~
                        녹음 완료 후 마음에 들지 않을 시 재녹음이 가능하답니당~
                        아래는 예시 문구로, 다른 원하는 이야기를 녹음하셔도 된답니당~ 30초씩 녹음해주세용~ 
                    </div>

                    <div>
                        <div>1번녹음</div>
                        <div className='recodingBox'>
                            벚꽃이 피면 사람들은 말한대.
                            봄이 왔다. 기분 좋다.
                            그런데 벚꽃에는 사람들이 모르는 향기로운 비밀이 있대.
                            벚꽃이 지면 그때야 알게 돼.
                            딱 일주일, 길면 이 주. 찰나를 살고 찰나 속에 가는 벚꽃이란 그리움인걸.
                        </div>
                        <audio controls id="audioPlayback" style={{ display: 'none' }}></audio>
                        <button onClick={startRecording} disabled={isRecording}>녹음 시작</button>
                        <button onClick={stopRecording} disabled={!isRecording}>녹음 완료</button>
                        <button onClick={playRecording}>들어보기</button>
                        <button onClick={saveRecording} disabled={!audioUrl}>등록하기</button>
                    <div>2번녹음</div>
                    <div className='recodingBox'>
                        내가 눈 떴을 때 때는 바야흐로 봄이었다.
                        대지는 척박하고 바람은 거칠었다.
                        뿌리를 잘못 내린 듯 아무도 축복하지 않았지만,
                        그래도 봄은 아름다웠다.
                    </div>
                    <audio controls id="audioPlayback" style={{ display: 'none' }}></audio>
                        <button onClick={startRecording} disabled={isRecording}>녹음 시작</button>
                        <button onClick={stopRecording} disabled={!isRecording}>녹음 완료</button>
                        <button onClick={playRecording}>들어보기</button>
                        <button onClick={saveRecording}>등록하기</button>
                    <div>3번녹음</div>
                    <audio controls id="audioPlayback" style={{ display: 'none' }} src={audioUrl}></audio>
                    <div className='recodingBox'>
                        다시 봄 봄 봄 봄이 왔네요.
                        그대 없었던 내 가슴 시렸던 겨울을 지나
                        또 벚꽃잎이 피어나듯이,
                        다시 이 벤치에 앉아 추억을 그려보네요.
                    </div>
                    <audio controls id="audioPlayback" style={{ display: 'none' }}></audio>
                        <button onClick={startRecording} disabled={isRecording}>녹음 시작</button>
                        <button onClick={stopRecording} disabled={!isRecording}>녹음 완료</button>
                        <button onClick={playRecording}>들어보기</button>
                        <button onClick={saveRecording}>등록하기</button>
            </div>
        </div>
        </>
    );
};

export default Voice;