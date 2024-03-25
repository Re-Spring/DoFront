import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.
import "../../styles/mains/Main.css";
import "../../styles/common/Common.css";

function Main() {
    const [basicStories, setBasicStories] = useState([]); // 기본 동화 상태 추가
    const [userStories, setUserStories] = useState([]); // 유저 동화 상태 추가
    const [visibleCount, setVisibleCount] = useState(10);
    const [activeGenre, setActiveGenre] = useState('전체보기');

    useEffect(() => {
        fetchBasicStories(); // 기본 동화 불러오기
        fetchAllUserStories(); // 유저 동화 불러오기
    }, []);

    const fetchBasicStories = async () => {
        // 기본 동화 불러오기 로직 (예시로만 제공, 실제 API 경로에 맞게 수정 필요)
        try {
            const response = await fetch('http://localhost:8001/stories/role/admin');
            if (!response.ok) {
                throw new Error('Network response was not ok for basic stories');
            }
            const data = await response.json();
            setBasicStories(data);
        } catch (error) {
            console.error('Failed to fetch basic stories:', error);
        }
    };

    const fetchAllUserStories = async () => {
        // 유저 동화 불러오기 로직 (예시로만 제공, 실제 API 경로에 맞게 수정 필요)
        try {
            const response = await fetch('http://localhost:8001/stories/role/user');
            if (!response.ok) {
                throw new Error('Network response was not ok for user stories');
            }
            const data = await response.json();
            setUserStories(data);
        } catch (error) {
            console.error('Failed to fetch user stories:', error);
        }
    };

    const genreMappings = {
        '로맨스': 'romance',
        '전래동화': 'folktale',
        '판타지': 'fantasy',
        '모험': 'adventure',
        '우화': 'fable',
        '가족': 'family'
    };
    
    const fetchUserStoriesByGenre = async (genre) => {
        const genreInEnglish = genreMappings[genre] || genre; // 매핑된 영어 이름 사용, 매핑되지 않으면 기존 genre 사용
        try {
            if (genre === '전체보기') {
                fetchAllUserStories();
                return;
            }
    
            const response = await fetch(`http://localhost:8001/stories/genre/${genreInEnglish}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserStories(data);
        } catch (error) {
            console.error(`Failed to fetch user stories by genre ${genre}:`, error);
        }
    };

    const handleGenreClick = (genre) => {
        setActiveGenre(genre);
        fetchUserStoriesByGenre(genre);
    };

    const showMoreStories = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    function createImageUrl(fairytaleThumb) {
        const encodedPath = fairytaleThumb.replace(/\\/g, "/").split('/').map(encodeURIComponent).join('/');
        return `http://localhost:8002/${encodedPath}`;
    }

    return (
        <div className="mainBox">
            <div className="bannerBox">
                <img src="../images/banner.png" alt="" className="mainBanner"/>
            </div>
            <div className='adminBox'>
                {/* 기본 동화 표시 영역 */}
                    <div className="fairyTaleBox">
                        <p className="mainFairyTale">기본 동화</p>
                    </div>
                <div className='line'></div>
                <div className="fairyTalesContainer">
                    {basicStories.slice(0, visibleCount).map((story) => (
                        <div key={story.fairytaleCode} className="fairyTaleItem">
                            <Link to={`/bookContent/${story.fairytaleCode}`}>
                                <img src={createImageUrl(story.fairytaleThumb)} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                                <div className="fairyTaleContent">
                                    <h3>{story.fairytaleTitle}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
    
            <div className='userBox'>
                {/* 유저 동화 카테고리 선택 및 표시 영역 */}
                <div className='categoryBox'>
                    <div className="fairyTaleBox">
                        <p className="mainFairyTale">유저 동화</p>
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
                {userStories.length > 0 ? (
                    <div className="fairyTalesContainer">
                        {userStories.slice(0, visibleCount).map((story) => (
                            <div key={story.fairytaleCode} className="fairyTaleItem">
                                <Link to={`/bookContent/${story.fairytaleCode}`}>
                                    <img src={createImageUrl(story.fairytaleThumb)} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                                    <div className="fairyTaleContent">
                                        <h3>{story.fairytaleTitle}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="noStoriesMessage">
                        등록된 동화가 없습니다.
                    </div>
                )}
                <div className='moreBtnBox'>
                    {visibleCount < userStories.length && (
                        <button onClick={showMoreStories} className="loadMoreButton">더보기 ▼</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;