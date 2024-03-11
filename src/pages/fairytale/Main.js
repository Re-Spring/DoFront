import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.
import "../../styles/mains/Main.css";
import "../../styles/common/Common.css";

function Main() {
    const [stories, setStories] = useState([]);

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
                    <div key={story.fairytaleCode} className="fairyTaleItem">
                        {/* 여기에서 Link 컴포넌트를 사용하여 동화의 상세 페이지로의 링크를 생성합니다. */}
                        <Link to={`/bookContent/${story.fairytaleCode}`}>
                            <img src={story.fairytaleThumb} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                            <div className="fairyTaleContent">
                                <h3>{story.fairytaleTitle}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;
