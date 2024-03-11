import React, { useState, useEffect } from 'react';
import "../../styles/mains/Main.css";
import "../../styles/common/Common.css";

function Main() {
    const [stories, setStories] = useState([]); // 동화 목록을 저장할 상태

    useEffect(() => {
        fetchAllStories(); // 컴포넌트가 마운트될 때 모든 동화 목록을 불러옵니다.
    }, []);

    const fetchAllStories = async () => {
        try {
            
            // 백엔드 엔드포인트 URL을 수정해야 합니다. localhost 포트는 백엔드가 실행되는 포트로 변경해야 합니다.
            // 예시에서는 Spring Boot 기본 포트인 8080을 사용합니다. 또한, 요청 경로를 /stories로 변경합니다.
            const response = await fetch('http://localhost:8001/stories'); // 모든 동화 목록을 불러오는 요청
            

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    };

    const fetchStoriesByGenre = async (genre) => { // 장르별 동화 목록을 불러오는 함수
        try {
            // "전체보기" 선택 시 모든 동화 목록을 불러옵니다.
            if (genre === '전체보기') {
                fetchAllStories();
                return;
            }

            const response = await fetch(`http://localhost:8001/stories/genre/${genre}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data); // 불러온 동화 목록으로 상태 업데이트
        } catch (error) {
            console.error(`Failed to fetch stories by genre ${genre}:`, error);
        }
    };

    return (
        <div className="mainBox">
            <div className="bannerBox">
                <img src="../images/banner.png" alt="" className="mainBanner"/>
            </div>
            <div className='categoryBox'>
                <div className="fairyTaleBox">
                    <p className="mainFairyTale">동화</p>
                </div>
                <div>
                    {/* "전체보기" 버튼을 포함한 장르 목록 */}
                    <ul className='categoryList'>
                        <li><button onClick={() => fetchStoriesByGenre('전체보기')} className='categoryBtn'>전체보기</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('로맨스')} className='categoryBtn'>로맨스</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('전래동화')} className='categoryBtn'>전래동화</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('판타지')} className='categoryBtn'>판타지</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('모험')} className='categoryBtn'>모험</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('우화')} className='categoryBtn'>우화</button></li>
                        <li><button onClick={() => fetchStoriesByGenre('가족')} className='categoryBtn'>가족</button></li>
                    </ul>
                </div>
            </div>
            <div className='line'></div>
            <div className="fairyTalesContainer">
                {stories.map(story => (
                    <div key={story.fairytaleFileCode} className="fairyTaleItem">
                        <a href='/BookContent'>
                            <img src={story.fairytaleThumb} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                            <div className="fairyTaleContent">
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