import React, { useState, useRef } from 'react';
import '../../styles/voice/Voice.css';

function Voice() {
    
  const [chunks, setChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [userId, setUserId] = useState('');
  const mediaRecorder = useRef(null);

  const startRecording = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function (stream) {
              mediaRecorder.current = new MediaRecorder(stream);
              mediaRecorder.current.start();
              setChunks([]);

              mediaRecorder.current.ondataavailable = function (e) {
                  setChunks(prevChunks => [...prevChunks, e.data]);
              };

              mediaRecorder.current.onstop = function () {
                  const blob = new Blob(chunks, { 'type': 'audio/wav' });
                  const audioUrl = URL.createObjectURL(blob);
                  setAudioUrl(audioUrl);
              };
          })
          .catch(function (err) {
              console.log('An error occurred: ' + err);
          });
  };

  const stopRecording = () => {
      mediaRecorder.current.stop();
  };

  const playRecording = () => {
      const audioElement = document.getElementById('audioPlayback');
      audioElement.play();
  };

  const saveRecording = () => {
      const formData = new FormData();
      formData.append('audio_data', chunks[0]);
      formData.append('user_id', userId);
      // Fetch request to save recording data
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
                    <audio controls id="audioPlayback" style={{ display: 'none' }} src={audioUrl}></audio>
                    <div className='recodingBox'>
                      벚꽃이 피면 사람들은 말한대.
                      봄이 왔다. 기분 좋다.
                      그런데 벚꽃에는 사람들이 모르는 향기로운 비밀이 있대.
                      벚꽃이 지면 그때야 알게 돼.
                      딱 일주일, 길면 이 주. 찰나를 살고 찰나 속에 가는 벚꽃이란 그리움인걸.
                    </div>
                    <button onClick={startRecording}>녹음 시작</button>
                    <button onClick={stopRecording}>녹음 완료</button>
                    <button onClick={playRecording}>들어보기</button>
                    <button onClick={saveRecording}>등록하기</button>
                    <div>2번녹음</div>
                    <audio controls id="audioPlayback" style={{ display: 'none' }} src={audioUrl}></audio>
                    <div className='recodingBox'>
                    내가 눈 떴을 때 때는 바야흐로 봄이었다.
                    대지는 척박하고 바람은 거칠었다.
                    뿌리를 잘못 내린 듯 아무도 축복하지 않았지만,
                    그래도 봄은 아름다웠다.
                    </div>
                    <button onClick={startRecording}>녹음 시작</button>
                    <button onClick={stopRecording}>녹음 완료</button>
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
                    <button onClick={startRecording}>녹음 시작</button>
                    <button onClick={stopRecording}>녹음 완료</button>
                    <button onClick={playRecording}>들어보기</button>
                    <button onClick={saveRecording}>등록하기</button>
          </div>
      </div>
      </>
  );
};

export default Voice;