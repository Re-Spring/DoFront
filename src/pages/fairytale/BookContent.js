import "../../styles/mains/BookContent.css";
import "../../styles/common/Common.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookContent() {
    const [bookDetail, setBookDetail] = useState({
        fairytaleSummary: '',
        fairytaleTitle: '',
        fairytaleGenre: '',
        fairytaleThumb: '',
        userId: ''
    });
    const { fairytaleCode } = useParams();

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                if (!fairytaleCode) {
                    console.error("fairytaleCode is null or invalid.");
                    return;
                }
                const response = await fetch(`http://localhost:8001/stories/${fairytaleCode}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch book detail, status: ${response.status}`);
                }
                const data = await response.json();
                setBookDetail(data);
            } catch (error) {
                console.error("Error fetching book detail:", error);
            }
        };
    
        if (fairytaleCode) {
            fetchBookDetail();
        }
    }, [fairytaleCode]);
    
    return (
        <div className="book-content">
            <div className="contentImgBox">
                <img src={bookDetail.fairytaleThumb} className="contentImg" alt="Fairytale Thumbnail" />
            </div>
            <div className="contentListBox">
                <p className="fairytaleName">{bookDetail.fairytaleTitle}</p>
                <div className="contentList">    
                    <p className="listName">장르</p>
                    <input type="text" value={bookDetail.fairytaleGenre} />
                </div>
                <div className="contentList">
                    <p className="listName">줄거리</p>
                    <input type="text" value={bookDetail.fairytaleSummary} />
                </div>
                <div className="contentList">
                    <p className="listName">저자</p>
                    <input type="text" value={bookDetail.userId} />
                </div>
            </div>
        </div>
    );
}

export default BookContent;

