import React, { useState, useEffect } from 'react';
import "../../styles/mains/main.css";
import "../../styles/common/common.css";

function Main() {
    // 상태를 관리하기 위한 Hooks
    const [fairytales, setFairytales] = useState([]); // 동화 목록을 저장할 상태

    // 컴포넌트가 마운트되면 동화 목록을 불러옵니다.
    useEffect(() => {
        // API 요청을 통해 동화 목록을 가져오는 함수
        fetchFairytales();
    }, []);

    const fetchFairytales = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fairytales'); // URL 수정
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFairytales(data);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch fairytales:', error);
        }
    };

    return (
        <div className="mainBox">
            <div className="bannerBox">
                <img src="../images/banner.png" alt="" className="mainBanner"/>
            </div>
            <div className="fariytaleBox">
                <p className="mainFariyTale">동화</p>
            </div>
            <div className="fairytalesContainer">
                {/* 데이터베이스에서 불러온 동화 목록을 표시합니다. */}
                {fairytales.map(fairytale => (
                    <div key={fairytale.fairytale_file_code} className="fairytaleItem">
                        <img src={fairytale.fairytale_thumb} alt="Fairytale Thumbnail" className="fairytaleThumbnail" />
                        <div className="fairytaleContent">
                            <h3>{fairytale.fairytale_title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;
