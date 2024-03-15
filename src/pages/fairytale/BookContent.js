import "../../styles/mains/BookContent.css";
import "../../styles/common/Common.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookContent() {
    // 책의 상세 정보 상태 값 설정
    const [bookDetail, setBookDetail] = useState({
        fairytaleSummary: '', // 동화 요약
        fairytaleTitle: '', // 동화 제목
        fairytaleGenre: '', // 동화 장르
        fairytaleThumb: '', // 동화 썸네일
        userId: '' // 사용자 ID
    });
    
    // useParams 훅을 통해 fairytaleCode 추출
    const { fairytaleCode } = useParams();

    // fairytaleCode가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        // 동화 코드가 없거나 유효하지 않을 경우 에러 메시지 출력 후 종료
        if (!fairytaleCode) {
            console.error("fairytaleCode is null or invalid.");
            return;
        }

        // 책의 상세 정보를 가져오는 비동기 함수 fetchBookDetail 선언
        const fetchBookDetail = async () => {
            try {
                // 동화 코드를 이용하여 책의 상세 정보를 가져옴
                const response = await fetch(`http://localhost:8001/stories/${fairytaleCode}`);
                
                // HTTP 응답이 성공적이지 않을 경우 에러 발생
                if (!response.ok) {
                    throw new Error(`Failed to fetch book detail, status: ${response.status}`);
                }

                // JSON 형식으로 변환하여 데이터 가져오기
                const data = await response.json();
                
                // 책의 상세 정보를 상태 값으로 설정
                setBookDetail(data);
            } catch (error) {
                // 에러 발생 시 에러 메시지 출력
                console.error("Error fetching book detail:", error);
            }
        };
    
        // fairytaleCode가 존재할 경우 fetchBookDetail 함수 실행
        if (fairytaleCode) {
            fetchBookDetail();
        }
    }, [fairytaleCode]); // fairytaleCode가 변경될 때마다 useEffect 재실행
    
    return (
        <div className="bookContent">
            <div className="bookBox">
                <div className="contentImgBox">
                    <img src={bookDetail.fairytaleThumb} className="contentImg" alt="Fairytale Thumbnail" />
                </div>
                <div className="contentListBox">
                    <div className="contentList">
                        <p className="listName">제목</p>
                        <input type="text" value={bookDetail.fairytaleTitle} className="titleInput" />
                    </div>
                    <div className="contentList">
                        <p className="listName">저자</p>
                        <input type="text" value={bookDetail.userId} className="userInput" />
                    </div>
                    <div className="contentList">    
                        <p className="listName">장르</p>
                        <input type="text" value={bookDetail.fairytaleGenre} className="genreInput" />
                    </div>
                    <div className="contentList">
                        <p className="listName">줄거리</p>
                        <textarea type="text" value={bookDetail.fairytaleSummary} className="summaryInput" />
                    </div>
                </div>
            </div>
            <div className="voiceBox">

            </div>
        </div>
    );
}

export default BookContent;

