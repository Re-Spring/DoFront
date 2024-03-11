import "../../styles/mains/BookContent.css";
import "../../styles/common/Common.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookContent() {
    const [bookDetail, setBookDetail] = useState({ 
      fairytaleTitle: '', 
      summary: '', 
      fairytaleThumb: '' 
    });
    const { detailCode } = useParams();

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                if (!detailCode) { // detailCode가 없거나 유효하지 않은 경우 early return
                    console.error("detailCode is null or invalid.");
                    return;
                }
                const response = await fetch(`http://localhost:8001/api/details/${detailCode}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch book detail, status: ${response.status}`);
                }
                const data = await response.json();
                setBookDetail(data);
            } catch (error) {
                console.error("Error fetching book detail:", error);
            }
        };
    
        if (detailCode) {
            fetchBookDetail();
        }
    }, [detailCode]);
    

    return (
        <div className="book-content">
            <h1>{bookDetail.fairytaleTitle}</h1>
            <p>Summary: {bookDetail.summary}</p>
            <img src={bookDetail.fairytaleThumb} alt="Fairytale Thumbnail" />
        </div>
    );
}

export default BookContent;
