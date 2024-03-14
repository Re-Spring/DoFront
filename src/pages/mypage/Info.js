import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/auth/AuthContext";
import "../../styles/mypage/Info.css";

function Info() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // 로그아웃 함수를 가져옵니다.

    const [userInfo, setUserInfo] = useState({
        userName: user?.userName || '', // Optional chaining for safety
        phone: user?.phone || '',
    });
    const [isEditable, setIsEditable] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:8001/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    userName: userInfo.userName,
                    phone: userInfo.phone,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user information');
            }

            Swal.fire({
                title: "수정 성공!",
                text: "정보가 수정 되었습니다. 다시 로그인 해주세요.",
                icon: "success"
              });
            logout(); // 로그아웃 함수 호출
            navigate('/login'); // 로그아웃 후 로그인 페이지로 리다이렉션
        } catch (error) {
            console.error('Failed to update user information:', error);
            Swal.fire({
                title: "수정 실패",
                text: "정보 업데이트를 실패했습니다.",
                icon: "error"
              });
        }
    };

    // 날짜 포맷을 "YYYY. MM. DD" 형식으로 조정합니다.
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <div className="info">
            <div className="welcomeMessage">
                <p>{formatDate(user.enrollDate)}로부터 Do:Riring과 함께하셨습니다❤️</p>
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
                <div className="notifyBox">
                    {isEditable ? (
                        <button onClick={handleUpdate} className="modify">수정 완료</button>
                    ) : (
                        <button onClick={() => setIsEditable(true)} className="modify">정보 수정하기</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Info;
