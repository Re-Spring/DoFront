import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/mybook/MyBook.css";
import "../../styles/common/Common.css";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function MyBook() {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(""); // 에러 상태를 관리할 수 있도록 초기화
    const [visibleCount, setVisibleCount] = useState(10); // 초기에 보이는 동화의 수

    const user = jwtDecode(localStorage.getItem("accessToken"));
    const userCode = user.userCode

    useEffect(() => {
        // 로컬 스토리지에서 userCode 가져오기
        // const userCode = localStorage.getItem("userCode"); // 로그인 시 저장된 userCode 사용
        // console.log("여기입니다" + userCode); // 디버깅을 위해 userCode 출력

        axios.get(`http://localhost:8001/stories/usercode/${userCode}`)
            .then(response => {
                // 응답 데이터 로깅 및 상태 업데이트
                console.log(response.data);
                setStories(response.data);
            })
            .catch(error => {
                // 에러 처리: 에러 발생 시 에러 상태를 업데이트
                console.error("Failed to fetch stories", error);
                setError("동화를 불러오는 데 실패했습니다.");
            });
    }, []);

    if (error) {
        // 에러 발생 시 사용자에게 에러 메시지 표시
        return <div className='errorMessage'>Error: {error}</div>;
    }

    const showMoreStories = () => {
        setVisibleCount(prevCount => prevCount + 10); // "더보기" 버튼 클릭 시 10개씩 추가로 표시
    };

    function createImageUrl(fairytaleThumb) {
        const encodedPath = fairytaleThumb.replace(/\\/g, "/").split('/').map(encodeURIComponent).join('/');
        return `http://localhost:8002/${encodedPath}`;
    }

    return (
        <div className='myBookBox'>
            <div>
                <p className='myBook'>내 동화</p>
            </div>
            <div className='myBookContainer'>
                {stories.length > 0 ? (
                    stories.slice(0, visibleCount).map(story => (
                        <div key={story.fairytaleCode} className='myBookItem'>
                            <Link to={`/bookContent/${story.fairytaleCode}`}>
                                <img src={createImageUrl(story.fairytaleThumb)} alt="Story Thumbnail" className="fairyTaleThumbnail" />
                                <div className='fairyTaleContent'>
                                    <h3>{story.fairytaleTitle}</h3>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className='notFairytale'>등록한 동화가 없습니다.</div>
                )}
            </div>
            <div className='moreBtnBox'>
                {visibleCount < stories.length && (
                    <button onClick={showMoreStories} className="loadMoreButton">더보기 ▼</button>
                )}
            </div>
        </div>
    );
}

export default MyBook;
