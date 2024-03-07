import React, { useState, useEffect } from 'react';
import "../../styles/mains/Main.css";
import "../../styles/common/Common.css";

function Main() {
    const [stories, setStories] = useState([]); // 동화 목록을 저장할 상태 이름 변경: fairytales -> stories

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            // 백엔드 엔드포인트 URL을 수정해야 합니다. 192.168.0.172 포트는 백엔드가 실행되는 포트로 변경해야 합니다.
            // 예시에서는 Spring Boot 기본 포트인 8080을 사용합니다. 또한, 요청 경로를 /stories로 변경합니다.
            const response = await fetch('http://192.168.0.172:8001/stories'); // URL 수정: 포트와 경로
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data); // 상태 업데이트 함수 이름 변경: setFairytales -> setStories
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    };

    return (
        <div className="mainBox">
            <div className="bannerBox">
                <img src="../images/banner.png" alt="" className="mainBanner"/>
            </div>
            <div className="fariytaleBox">
                <p className="mainFariyTale">동화</p>
            </div>
            <div className='line'></div>
            <div className="fairytalesContainer">
                {stories.map(story => (
                    <div key={story.fairytaleFileCode} className="fairytaleItem">
                        <a href='/'>
                            <img src={story.fairytaleThumb} alt="Story Thumbnail" className="fairytaleThumbnail" />
                            <div className="fairytaleContent">
                                <h3>{story.fairytaleTitle}</h3>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;