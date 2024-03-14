import React, { useState, useRef, useEffect } from 'react';
import '../../styles/voice/Voice.css';
import { useDispatch } from 'react-redux';
import { voiceCloningAPI } from '../../apis/VoiceAPI';
import Swal from "sweetalert2";
import { useAuth } from '../../components/auth/AuthContext';

function Voice() {
    const [chunks, setChunks] = useState([]);
    const mediaRecorder = useRef(null);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userId = user.userId;
    
    const [recordings, setRecordings] = useState([
        { isRecording: false, isRecorded: false, isSaved: false },
        { isRecording: false, isRecorded: false, isSaved: false },
        { isRecording: false, isRecorded: false, isSaved: false },
    ]);
    const [audioUrls, setAudioUrls] = useState([null, null, null]);
    const recordingMessages = [
        "벚꽃이 피면 사람들은 말한대\n봄이 왔다 기분 좋다\n\n그런데 벚꽃에는\n사람들이 모르는 향기로운 비밀이 있대\n\n벚꽃이 지면 그때야 알게 돼\n딱 일주일 길면 이 주\n찰나를 살고 찰나 속에 가는 벚꽃이란 그리움인걸",
        "내가 눈 떴을 때 때는 바야흐로 봄이었다.\n대지는 척박하고 바람은 거칠었다.\n뿌리를 잘못 내린 듯 아무도 축복하지 않았지만,\n그래도 봄은 아름다웠다.\n\n잘게 분해되는 눈 위로 따뜻한 햇살이 덮였다.",
        "그대가 밀어올린 꽃줄기 끝에서\n그대가 피는 것인데\n왜 내가 이다지도 떨리는지\n\n그대가 피어 그대 몸속으로\n꽃벌 한 마리 날아든 것인데\n왜 내가 이다지도 아득한지\n왜 내 몸이 이리도 뜨거운지\n\n그대가 꽃피는 것이\n처음부터 내 일이었다는 듯이"
    ];
    
    console.log("클론페이지 아이디 확인 : ", userId);

    useEffect(() => {
        // audioUrls 상태가 업데이트될 때마다 로그 출력
        audioUrls.forEach((url, index) => console.log(`Audio URL ${index + 1}: ${url}`));
    }, [audioUrls]);

    function createWaveBlobFromAudioData(audioDataBlob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const audioData = new Uint8Array(e.target.result);
                const sampleRate = 44100; // 예시로 44100을 사용합니다. 실제 샘플레이트를 사용하세요.
                const numChannels = 1; // 예시로 모노 채널을 사용합니다. 실제 채널 수를 사용하세요.
                const bitsPerSample = 16; // 16비트 샘플
                const blockAlign = numChannels * bitsPerSample / 8;
                const byteRate = sampleRate * blockAlign;
                const dataSize = audioData.length;
                const chunkSize = 36 + dataSize;
                const riffHeader = new ArrayBuffer(44);
                const view = new DataView(riffHeader);
                // "RIFF" 청크
                writeString(view, 0, 'RIFF');
                view.setUint32(4, chunkSize, true);
                writeString(view, 8, 'WAVE');
                // "fmt " 서브 청크
                writeString(view, 12, 'fmt ');
                view.setUint32(16, 16, true); // 서브 청크 크기: 16
                view.setUint16(20, 1, true); // 오디오 포맷: PCM
                view.setUint16(22, numChannels, true);
                view.setUint32(24, sampleRate, true);
                view.setUint32(28, byteRate, true);
                view.setUint16(32, blockAlign, true);
                view.setUint16(34, bitsPerSample, true);
                // "data" 서브 청크
                writeString(view, 36, 'data');
                view.setUint32(40, dataSize, true);
                // WAV 파일의 최종 Blob 생성
                const wavBlob = new Blob([view, audioData], { type: 'audio/wav' });
                resolve(wavBlob);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(audioDataBlob);
        });
    }

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    const startRecording = (index) => {
        // 사용자의 마이크 접근 권한을 요청하고 스트림을 가져옴
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream);
                const localChunks = []; // 로컬 변수로 chunks 관리
                mediaRecorder.current.start();
                updateRecordingState(index, true, false, false); // 녹음 시작 상태 업데이트

                mediaRecorder.current.ondataavailable = e => {
                    localChunks.push(e.data); // 로컬 변수 업데이트
                };
            
                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(localChunks, { 'type': 'audio/wav' });
                    const newAudioUrl = URL.createObjectURL(blob);
                    console.log(newAudioUrl);
                    setAudioUrls(prevAudioUrls => prevAudioUrls.map((url, idx) => idx === index ? newAudioUrl : url));
                    console.log(audioUrls);
                    updateRecordingState(index, false, true, recordings[index].isSaved); // 녹음 완료 상태 업데이트
                };          
            setTimeout(() => mediaRecorder.current.stop(), 100000);
        }).catch(err => {
            console.error('startRecording에서 에러 발생 : ', err);
        });
    };

    const stopRecording = (index) => {
        if (mediaRecorder.current && recordings[index].isRecording) {
            mediaRecorder.current.stop(); // 녹음 중지
            console.log('녹음 중지 시도');
        } else {
            console.error('MediaRecorder가 초기화되지 않았습니다.');
        }
    }

    const saveRecording = (index) => {
        
        if (!audioUrls[index]) {
            console.log(`${index} : No audio data to save.`);
            return;
        }
        // 이 예제에서는 파일을 임시 저장하는 로직을 구현하지 않습니다.
        // 실제 애플리케이션에서는 여기서 파일을 서버에 업로드하거나,
        // 필요한 처리를 수행한 후에 isSaved 상태를 업데이트해야 합니다.
        updateRecordingState(index, false, true, true); // 저장 상태 업데이트

    };

    // 녹음 상태 업데이트 헬퍼 함수
    const updateRecordingState = (index, isRecording, isRecorded, isSaved) => {
        setRecordings(prevRecordings =>
            prevRecordings.map((recording, idx) =>
                idx === index ? { ...recording, isRecording, isRecorded, isSaved } : recording
            )
        );
    };
    
    const cloneVoiceHandler = async (e) => {
        e.preventDefault();
        const allRecorded = recordings.every(recording => recording.isSaved);

        if(!allRecorded) {
            Swal.fire({
                icon: 'warning',
                title: "녹음을 모두 등록해 주세요",
                text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                confirmButtonText: "확인"
            });
            return;
        }

        const formData = new FormData();
        for (let index = 0; index < audioUrls.length; index++) {
            if (recordings[index].isSaved) {
                const response = await fetch(audioUrls[index]);
                const audioBlob = await response.blob();
                // 여기서 createWaveBlobFromAudioData 함수를 호출하여 WAV 형식으로 변환
                createWaveBlobFromAudioData(audioBlob).then(wavBlob => {
                    const fileName = `${userId}_${index + 1}.wav`;
                    // FormData에 변환된 WAV Blob 추가
                    formData.append("files", new File([wavBlob], fileName, { type: "audio/wav" }));
                }).catch(error => {
                    console.error('WAV 변환 오류:', error);
                });
            }
        }

        // FormData에 userId를 추가합니다.
        formData.append('user_id', userId);
        console.log("페이지에서 formdate 확인 : ", formData);
        dispatch(voiceCloningAPI(formData));

        // console.log('모든 오디오 파일 및 userId 서버로 전송:', audioUrls, userId);
    }

    const tempVoiceCode = localStorage.getItem('tempVoiceCode');
    console.log("클론 직후 보이스코드 확인 : ", tempVoiceCode);

    return (
    <>
        <div className='voiceClone'>
            <div className="bigTitle">
                <h1>목소리 등록</h1>
            </div>
            {!tempVoiceCode || !user.userVoiceId || user.userVoiceId === null ? (
                <>
                    <div className="middleTitle">
                        <h2>안내 사항</h2>
                        <img className='clomeImg' src="/images/clone_img.jpg"/>
                    </div>
                    <div className='infoBox'> 
                        목소리 등록을 위해 총 3개의 구절을 녹음합니다. 녹음은 가능한 잡음이 적은 환경에서 해주세요.<br/>
                        녹음 완료 후 녹음본 확인과 재녹음이 가능합니다.<br/>
                        아래는 예시 문구로, 다른 임의의 내용으로 녹음 시 한 녹음 당 20초 내외로 녹음해 주세요.<br/>
                        3개의 녹음본을 모두 등록한 후 목소리 등록 버튼을 눌러주세요.
                    </div>
                    <br/>
                    <div className='recordingContainer'>
                        {[0, 1, 2].map((index) => (
                            <div key={index}>
                                <h3>{index + 1}번 녹음</h3>
                                <div className='recodingBox'>
                                    {recordingMessages[index]}
                                </div>
                                <br/>
                                <div className='buttonsContainer'>
                                    <button onClick={() => startRecording(index)} disabled={recordings[index].isRecording }>녹음 시작</button>
                                    <button onClick={() => stopRecording(index)} disabled={!recordings[index].isRecording}>녹음 완료</button>
                                    <button onClick={() => saveRecording(index)} disabled={!recordings[index].isRecorded}>등록하기</button>
                                </div>
                                <br/>
                                <audio controls src={audioUrls[index]} />
                            </div>
                        ))}
                    </div>
                    <br/><br/>
                    <button onClick={cloneVoiceHandler}>목소리 등록</button>
                </>
            ) : (
                <h2>이미 목소리가 등록되어있습니다. 즐거운 리링 하세요!</h2>
            )}
        </div>
    </>
    );
};

export default Voice;