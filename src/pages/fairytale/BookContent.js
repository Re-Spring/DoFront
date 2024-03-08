import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/mains/BookContent.css";
import "../../styles/common/Common.css";

function BookContent() {
    const [story, setStory] = useState(null);
    const { fairytaleFileCode } = useParams(); // URL로부터 fairytaleFileCode 받아오기

    // 동화 상세 정보를 불러오는 함수
    useEffect(() => {
        fetch(`http://localhost:8001/stories/${fairytaleFileCode}`)
            .then(response => response.json())
            .then(data => setStory(data))
            .catch(error => console.error("Error fetching story details:", error));
    }, [fairytaleFileCode]); // fairytaleFileCode가 변경될 때마다 실행

    return (
        <div className="contentBox">
            {story ? (
                <>
                    <h1>{story.fairytaleTitle}</h1>
                    <img src={story.fairytaleThumb} alt="Thumbnail" />
                    <p><strong>Summary:</strong> {story.summary}</p>
                    <p><strong>Story:</strong> {story.fairytaleStory}</p>
                </>
            ) : (
                <p>Loading story details...</p>
            )}
        </div>
    );
}

export default BookContent;
