import React, { useEffect, useState } from 'react';
import "../../styles/mains/Header.css";
import "../../styles/common/Common.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';

function Header() {

    // 로그인 상태 확인 및 업데이트
    const [user, setUser] = useState(null);

    // 로그인 상태 업데이트를 위한 함수
    const updateLoginState = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUser(decoded);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 로그인 상태 업데이트
        updateLoginState();

        // 로그인 상태 변경을 감지하는 이벤트 리스너 추가
        window.addEventListener('storage', updateLoginState);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('storage', updateLoginState);
    }, []);

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        // 로컬 스토리지 변경 후 상태 업데이트
        updateLoginState();
        window.location.href = '/';
    };

    // useEffect(() => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     if (accessToken) {
    //         const decodedUser = jwtDecode(accessToken);
    //         setUser(decodedUser);
    //     } else {
    //         setUser(null);
    //     }
    // }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때만 실행

    // // 로그아웃 함수
    // const handleLogout = () => {
    //     // 로컬 스토리지에서 토큰 제거
    //     localStorage.removeItem('accessToken');
    //     setUser(null);
    //     // 사용자를 메인 페이지로 리디렉션
    //     window.location.href = '/';
    // };



    // 각 메뉴에 대한 서브메뉴 표시 상태를 관리하기 위한 상태
    const [subMenuStates, setSubMenuStates] = useState({
        myBook: false,
        voice: false,
        myPage: false
    });

    // 메뉴에 마우스를 올렸을 때 해당 서브메뉴를 표시하는 로직
    const handleMouseEnter = (menu) => {
        setSubMenuStates(prevState => ({
            ...prevState,
            [menu]: true
        }));
    };

    // 메뉴에서 마우스를 떼었을 때 해당 서브메뉴를 숨기는 로직
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
                        <input className="searchInput" type="text" placeholder="동화 검색" />
                        <button className="searchBtn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className="mainWrap">
                    <div className="mainMenuBox">
                        <ul className="mainMenu">
                            <li onMouseEnter={() => handleMouseEnter('myBook')} onMouseLeave={() => handleMouseLeave('myBook')}>
                                <a href="/">MyBook</a>
                                {subMenuStates.myBook && (
                                    <ul className="subMenu">
                                        <li><a href="/Make">동화 만들기</a></li>
                                        <li><a href="/">내 동화</a></li>
                                    </ul>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('voice')} onMouseLeave={() => handleMouseLeave('voice')}>
                                <a href="/">목소리</a>
                                {subMenuStates.voice && (
                                    <ul className="subMenu">
                                        <li><a href="/Clone">목소리 등록</a></li>
                                    </ul>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('myPage')} onMouseLeave={() => handleMouseLeave('myPage')}>
                                <a href="/">마이페이지</a>
                                {subMenuStates.myPage && (
                                    <ul className="subMenu">
                                        <li><a href="/Info">내 정보</a></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="homeLogin">
                        {user ? (
                            // 토큰이 있는 경우 사용자 이름과 로그아웃 표시
                            <>
                                <a>{user.userName}님 환영합니다 |</a>
                                <a onClick={handleLogout}> 로그아웃</a>
                            </>
                        ) : (
                            // 토큰이 없는 경우 로그인 및 회원가입 링크 표시
                            <>
                                <a href="/login">로그인 |</a>
                                <a href="/enroll"> 회원가입</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
