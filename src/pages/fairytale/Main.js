import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.
import "../../styles/mains/Main.css";
import "../../styles/common/Common.css";

function Main() {
    const [stories, setStories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10); // 초기에 보이는 동화의 수
    const [activeGenre, setActiveGenre] = useState('전체보기'); // 현재 선택된 카테고리 추적

    useEffect(() => {
        fetchAllStories();
    }, []);

    const fetchAllStories = async () => {
        try {
            const response = await fetch('http://localhost:8001/stories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    };

    const fetchStoriesByGenre = async (genre) => {
        try {
            if (genre === '전체보기') {
                fetchAllStories();
                return;
            }

            const response = await fetch(`http://localhost:8001/stories/genre/${genre}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data);
        } catch (error) {
            console.error(`Failed to fetch stories by genre ${genre}:`, error);
        }
    };

    const handleGenreClick = (genre) => {
        setActiveGenre(genre); // 클릭된 장르를 activeGenre로 설정
        fetchStoriesByGenre(genre); // 장르에 맞는 스토리를 가져오는 함수 호출
    };

    const showMoreStories = () => {
        setVisibleCount(prevCount => prevCount + 10); // "더보기" 버튼 클릭 시 10개씩 추가로 표시
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
                    <ul className='categoryList'>
                        {['전체보기', '로맨스', '전래동화', '판타지', '모험', '우화', '가족'].map((genre) => (
                            <li key={genre}>
                                <button onClick={() => handleGenreClick(genre)} className={`categoryBtn ${activeGenre === genre ? 'active' : ''}`}>
                                    {genre}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='line'></div>
            <div className="fairyTalesContainer">
                {stories.slice(0, visibleCount).map(story => (
                    <div key={story.fairytaleCode} className="fairyTaleItem">
                        <Link to={`/bookContent/${story.fairytaleCode}`}>
                            <img src={story.fairytaleThumb} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                            <div className="fairyTaleContent">
                                <h3>{story.fairytaleTitle}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='moreBtnBox'>
                {visibleCount < stories.length && (
                    <button onClick={showMoreStories} className="loadMoreButton">더보기 ▼</button>
                )}
            </div>
        </div>
    );
}

export default Main;
