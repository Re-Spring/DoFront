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
        userId: '',
        videoFileCode: '' // 비디오 파일 코드 상태 추가
    });
    const [videoPath, setVideoPath] = useState(''); // 비디오 경로 상태 추가

    const { fairytaleCode } = useParams();

    useEffect(() => {
        if (!fairytaleCode) {
            return;
        }

        const fetchBookDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8001/stories/detail/${fairytaleCode}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch book detail, status: ${response.status}`);
                }
                const data = await response.json();
                setBookDetail(data);

                // 비디오 파일 코드가 있는 경우, 비디오 경로 조회
                if (data.videoFileCode) {
                    fetchVideoPath(data.videoFileCode);
                }
            } catch (error) {
            }
        };

        fetchBookDetail();
    }, [fairytaleCode]);

    // 비디오 파일 코드를 사용하여 비디오 경로를 조회하는 함수
    const fetchVideoPath = async (videoFileCode) => {
        try {
            // 요청 URL이 백엔드 엔드포인트와 일치하는지 확인
            const response = await fetch(`http://localhost:8001/stories/video/${videoFileCode}`);
            if (!response.ok) {
                throw new Error(`비디오 경로를 가져오는데 실패했습니다, 상태: ${response.status}`);
            }
            // BookContent.js 내의 fetchVideoPath 수정 부분
            const data = await response.json();
            setVideoPath(data.videoPath); // 이제 data 객체 내에 videoPath 키를 기대할 수 있습니다.
        } catch (error) {
        }
    };

    function createImageUrl(fairytaleThumb) {
        const encodedPath = fairytaleThumb.replace(/\\/g, "/").split('/').map(encodeURIComponent).join('/');
        return `http://localhost:8002/${encodedPath}`;
    }

    function createVideoUrl(videoPath) {
        if(!videoPath) return '';
        const encodedPath = videoPath.replace(/\\/g, "/").split('/').map(encodeURIComponent).join('/');
        return `http://localhost:8002/${encodedPath}`;
    }

    return (
        <div className="bookContent">
            <div className="bookBox">
                <div className="contentImgBox">
                    <img src={createImageUrl(bookDetail.fairytaleThumb)} className="contentImg" alt="Fairytale Thumbnail" />
                </div>
                <div className="contentListBox">
                    <div className="contentList">
                        <p className="listName">제목</p>
                        <input type="text" value={bookDetail.fairytaleTitle} className="titleInput" readOnly />
                    </div>
                    <div className="contentList">
                        <p className="listName">저자</p>
                        <input type="text" value={bookDetail.userId} className="userInput" readOnly />
                    </div>
                    <div className="contentList">    
                        <p className="listName">장르</p>
                        <input type="text" value={bookDetail.fairytaleGenre} className="genreInput" readOnly />
                    </div>
                    <div className="contentList">
                        <p className="listName">줄거리</p>
                        <textarea value={bookDetail.fairytaleSummary} className="summaryInput" readOnly />
                    </div>
                </div>
            </div>
            <div className="voiceBox">
                {videoPath && (
                    <video className="video" controls>
                        <source src={createVideoUrl(videoPath)} type="video/mp4" />
                    </video>
                )}
            </div>
        </div>
    );
}

export default BookContent;
