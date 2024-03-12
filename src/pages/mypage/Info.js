import React, { useState } from 'react';
import { useAuth } from "../../components/auth/AuthContext";
import "../../styles/mypage/Info.css";

function Info() {
    const { user, updateLoginState } = useAuth();

    // 사용자 정보와 입력 필드의 수정 가능 여부를 상태로 관리합니다.
    const [userInfo, setUserInfo] = useState({
        userName: user.userName,
        phone: user.phone,
    });
    const [isEditable, setIsEditable] = useState(false);

    // 입력 필드 변경을 관리하는 함수입니다.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    // '정보 수정하기' 버튼 클릭 이벤트 핸들러입니다.
    const handleEditClick = () => {
        setIsEditable(true); // 입력 필드를 수정 가능하게 설정합니다.
    };

    // '수정 완료' 버튼 클릭 이벤트 핸들러입니다.
    const handleUpdate = async () => {
        try {
            const response = await fetch('/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 인증 헤더가 필요한 경우 여기에 추가
                },
                body: JSON.stringify({
                    userId: parseInt(user.userId, 10), // userId를 Integer로 변환
                    userName: userInfo.userName,
                    phone: userInfo.phone
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user information');
            }
    
            // 서버 응답에 따른 추가 로직
            // 예: const updatedUser = await response.json();
            alert('사용자 정보가 성공적으로 업데이트되었습니다.');
            setIsEditable(false); // 수정 완료 후 입력 필드를 다시 읽기 전용으로 설정
            // 상태 업데이트 로직
        } catch (error) {
            console.error('Failed to update user information:', error);
            alert('사용자 정보 업데이트에 실패했습니다.');
        }
    };

    return (
        <div className="info">
            <div className="welcomeMessage">
                <p>{user.enrollDate}로부터 Do:Riring과 함께하셨습니다❤️</p>
            </div>
            <div className="myInfo">
                <div className="infoList">
                    <p className="infoName">ID</p>
                    <input readOnly value={user.userId} className="infoInput" />
                </div>
                <div className="infoList">
                    <p className="infoName">이름</p>
                    <input
                        name="userName"
                        value={userInfo.userName}
                        onChange={handleInputChange}
                        className="infoInput"
                        readOnly={!isEditable}
                    />
                </div>
                <div className="infoList">
                    <p className="infoName">전화번호</p>
                    <input
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        className="infoInput"
                        readOnly={!isEditable}
                    />
                </div>
                <div className="nodifyBox">
                    {isEditable ? (
                        <button onClick={handleUpdate} className="modify">수정 완료</button>
                    ) : (
                        <button onClick={handleEditClick} className="modify">정보 수정하기</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Info;
