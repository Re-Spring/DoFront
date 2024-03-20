import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/mybook/MyBook.css";
import "../../styles/common/Common.css";
import { Link } from 'react-router-dom';

function MyBook() {
    const [stories, setStories] = useState([]);
    const [error] = useState(""); // 에러 상태 추가

    useEffect(() => {
        // 예시: 로컬 스토리지에서 userCode 가져오기
        const userCode = localStorage.getItem("userCode"); // 로그인 시 저장된 userCode 사용
    
        axios.get(`http://localhost:8001/stories/usercode/${userCode}`)
        .then(response => {
            console.log(response.data); // 응답 데이터 로깅
            setStories(response.data);
        })
        .catch(error => {
            console.error("Failed to fetch stories", error);
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // 에러 메시지 표시
    }

    return (
        <div className='myBookContainer'>
            {stories.length > 0 ? (
                stories.map(story => (
                    <div key={story.fairytaleCode} className='myBookItem'>
                        <Link to={`/bookContent/${story.fairytaleCode}`}>
                            <img src={story.fairytaleThumb} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                            <div className='fairyTaleContent'>
                                <h3>{story.fairytaleTitle}</h3>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                // 스토리가 없을 경우 메시지 표시
                <div className='notFairytale'>등록한 동화가 없습니다.</div> 
            )}
        </div>
    );
}

export default MyBook;
