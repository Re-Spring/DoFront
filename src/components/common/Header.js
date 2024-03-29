import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가합니다.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../auth/AuthContext';
import "../../styles/mains/Header.css";
import "../../styles/common/Common.css";

function Header() {
    const { user, updateLoginState } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleLoginSuccess = () => {
            updateLoginState();
        };
        window.addEventListener("loginSuccess", handleLoginSuccess);
        return () => {
            window.removeEventListener("loginSuccess", handleLoginSuccess);
        };
    }, [updateLoginState]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tempVoiceCode');
        // // 로그인 상태 업데이트

        // updateLoginState();
        window.location.reload(); // 페이지 새로고침
        // navigate('/');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        navigate('/search', { state: { searchTerm } });
    };

    // Added code: handleKeyPress function
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleSearch(e);
    }
};

    const [subMenuStates, setSubMenuStates] = useState({
        myBook: false,
        voice: false,
        myPage: false,
        userInfo: false,
        userService: false
    });

    const handleMouseEnter = (menu) => {
        setSubMenuStates(prevState => ({
            ...prevState,
            [menu]: true
        }));
    };

    const handleMouseLeave = (menu) => {
        setSubMenuStates(prevState => ({
            ...prevState,
            [menu]: false
        }));
    };

    return (
        <>
            <div className="headerBox">
                <div className="headerWrap">
                    <a href="/" style={{ height: "30px" }}>
                        <img src="../images/logo.png" alt="" className="logo" />
                    </a>
                    <div className="searchBox">
                        <input className="searchInput" type="text" placeholder="동화 검색" 
                        value={searchTerm}
                              // Added code: onKeyPress event handler for detecting Enter key press
                              onKeyPress={handleKeyPress} 
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        <button onClick={handleSearch} className="searchBtn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    </div>
                </div>
                <div className="mainWrap">
                    { user && user.userRole == "admin" ? (
                        <div className="mainMenuBox">
                            <ul className="mainMenu">
                                <li>
                                    <a href="/Make">새 동화 만들기</a>
                                </li>
                                <li>
                                    <a href="/userInfo">회원 정보 관리</a>
                                </li>
                                <li>
                                    <a href="/CustomerService">고객 문의 관리</a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                            <div className="mainMenuBox">
                                <ul className="mainMenu">
                                    <li onMouseEnter={() => handleMouseEnter('myBook')} onMouseLeave={() => handleMouseLeave('myBook')}>
                                        <p>MyBook</p>
                                        {subMenuStates.myBook && (
                                            <ul className="subMenu">
                                                <li><a href="/Make">동화 만들기</a></li>
                                                <li><a href="/MyBook">내 동화</a></li>
                                            </ul>
                                        )}
                                    </li>
                                    <li onMouseEnter={() => handleMouseEnter('voice')} onMouseLeave={() => handleMouseLeave('voice')}>
                                        <p>목소리 등록</p>
                                        {subMenuStates.voice && (
                                            <ul className="subMenu">
                                                <li><a href="/voice">목소리 등록</a></li>
                                            </ul>
                                        )}
                                    </li>
                                    <li onMouseEnter={() => handleMouseEnter('myPage')} onMouseLeave={() => handleMouseLeave('myPage')}>
                                        <p>마이페이지</p>
                                        {subMenuStates.myPage && (
                                            <ul className="subMenu">
                                                <li><a href="/Info">내 정보</a></li>
                                                <li><a href="/CustomerService">문의하기</a></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </div>
                    )}                  
                    <div className="homeLogin">
                        {user ? (
                            // 토큰이 있는 경우 사용자 이름과 로그아웃 표시
                            <>
                                <a style={{ cursor: 'default' }}>{user.userName}님 환영합니다 |</a>
                                <a onClick={handleLogout} style={{ cursor: 'pointer' }}> 로그아웃</a>
                            </>
                        ) : (
                            // 토큰이 없는 경우 로그인 및 회원가입 링크 표시
                            <>
                                <a href="/login">로그인 </a>
                                <a href="/enroll">| 회원가입</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
