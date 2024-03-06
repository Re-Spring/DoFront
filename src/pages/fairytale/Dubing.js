import React, { useState } from 'react';

function Dubing() {
    const [audioUrl, setAudioUrl] = useState('');
    const [script, setScript] = useState('오늘은 생활의 꿀팁을 알아보겠습니다.');

    const generateAudio = async () => {
        const formData = new FormData();
        formData.append('voice', 'alloy'); // 선택한 성우
        formData.append('script', script); // 입력한 스크립트

        try {
            const response = await fetch('/generate-audio/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error occurred while generating audio.');
            }

            const responseData = await response.json();
            setAudioUrl(responseData.audio_url);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <h1>OpenAI's Text-to-Audio Response</h1>
            <form>
                <label htmlFor="voice">성우를 선택하세요:</label>
                <select name="voice" id="voice">
                    <option value="alloy">alloy</option>
                    <option value="echo">echo</option>
                    <option value="fable">fable</option>
                    <option value="onyx">onyx</option>
                    <option value="nova">nova</option>
                    <option value="shimmer">shimmer</option>
                </select>
                <br />
                <label htmlFor="script">인공지능 성우가 읽을 스크립트를 입력해주세요:</label>
                <textarea
                    name="script"
                    id="script"
                    rows="4"
                    cols="50"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    required
                ></textarea>
                <br />
                <button type="button" onClick={generateAudio}>
                    생성
                </button>
            </form>

            {audioUrl && (
                <audio controls>
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </>
    );
}

export default Dubing;
