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
        "벚꽃이 피면 사람들은 말한대\n봄이 왔다 기분 좋다\n그런데 벚꽃에는\n사람들이 모르는 향기로운 비밀이 있대\n\n벚꽃이 지면 그때야 알게 돼\n딱 일주일 길면 이 주\n찰나를 살고 찰나 속에 가는\n벚꽃이란 그리움인걸\n\n벚꽃 그건 그리움인가봐",
        "네 장미꽃이 그토록 소중한 것은\n그 꽃을 위해 네가 공들인 시간 때문이야\n사막이 아름다운 것은\n그것이 어딘가에 샘을 감추고 있기 때문이야\n\n누군가에게 길들여진다는 것은\n눈물을 흘릴 일이 생긴다는 것인지도 몰라\n\n넌 네가 길들인 것에 대해\n언제까지나 책임을 져야 하는 거야\n넌 네 장미에 대해 책임이 있어",
        "그대가 밀어올린 꽃줄기 끝에서\n그대가 피는 것인데\n왜 내가 이다지도 떨리는지\n\n그대가 피어 그대 몸속으로\n꽃벌 한 마리 날아든 것인데\n왜 내가 이다지도 아득한지\n왜 내 몸이 이리도 뜨거운지\n\n그대가 꽃피는 것이\n처음부터 내 일이었다는 듯이"
    ];
    const [recordingMsg, setRecordingMsg] = useState(["", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    
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
                setRecordingMsg(prevMsgs => {
                    const newMsgs = [...prevMsgs];
                    newMsgs[index] = "녹음중..🎙"; // 특정 인덱스의 메시지 업데이트
                    return newMsgs;
                });

                mediaRecorder.current.ondataavailable = e => {
                    localChunks.push(e.data); // 로컬 변수 업데이트
                };
            
                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(localChunks, { 'type': 'audio/wav' });
                    const newAudioUrl = URL.createObjectURL(blob);
                    setAudioUrls(prevAudioUrls => prevAudioUrls.map((url, idx) => idx === index ? newAudioUrl : url));
                    updateRecordingState(index, false, true, recordings[index].isSaved); // 녹음 완료 상태 업데이트
                    setRecordingMsg(prevMsgs => {
                        const newMsgs = [...prevMsgs];
                        newMsgs[index] = "녹음완료📹"; // 특정 인덱스의 메시지 업데이트
                        return newMsgs;
                    });
                };          
            // setTimeout(() => mediaRecorder.current.stop(), 100000);
        }).catch(err => {
        });
    };

    const stopRecording = (index) => {
        if (mediaRecorder.current && recordings[index].isRecording) {
            mediaRecorder.current.stop(); // 녹음 중지
        } else {
        }
    }

    const saveRecording = (index) => {
        
        if (!audioUrls[index]) {
            return;
        }
        // 이 예제에서는 파일을 임시 저장하는 로직을 구현하지 않습니다.
        // 실제 애플리케이션에서는 여기서 파일을 서버에 업로드하거나,
        // 필요한 처리를 수행한 후에 isSaved 상태를 업데이트해야 합니다.
        updateRecordingState(index, false, true, true); // 저장 상태 업데이트
        setRecordingMsg(prevMsgs => {
            const newMsgs = [...prevMsgs];
            newMsgs[index] = "등록성공📥"; // 특정 인덱스의 메시지 업데이트
            return newMsgs;
        });
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
                });
            }
        }

        // FormData에 userId를 추가합니다.
        formData.append('user_id', userId);
        setIsLoading(true);
        dispatch(voiceCloningAPI({formData, setIsLoading}));

        // console.log('모든 오디오 파일 및 userId 서버로 전송:', audioUrls, userId);
    }

    const tempVoiceCode = localStorage.getItem('tempVoiceCode');

    return (
    <>
        <div className='voiceClone'>
            <div className="bigTitle">
                <p>목소리 등록</p>
            </div>
            { tempVoiceCode || (user.userVoiceId && user.userVoiceId != null) ? (
                <>
                    <br/>
                    <img className='cloneImg2' src="/images/clone_img_3.jpg"/>
                    <br/><br/>
                    <h2 style={{color : '#EB9A0E'}}>이미 목소리가 등록되어 있습니다. 즐거운 리링 하세요!</h2>
                    <br/><br/><br/>
                </>
            ) : (
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
                                <div className="recordMsg">{recordingMsg[index]}</div>
                                <br/>
                                <audio controls src={audioUrls[index]} />
                            </div>
                        ))}
                    </div>
                    <br/><br/>
                    {isLoading && (
                        <div className="loadingContainer">
                            <img src="/images/clone_loading.gif" alt="Loading..." />
                            <br/>
                            <p>loading..</p>
                        </div>
                    )}
                    <button onClick={cloneVoiceHandler}>목소리 등록</button>
                </>
            )}
        </div>
    </>
    );
};

export default Voice;