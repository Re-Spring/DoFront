import React, { useEffect, useState } from 'react';
import "../../styles/mains/Header.css";
import "../../styles/common/Common.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../auth/AuthContext';

function Header() {

    // 로그인 상태와 업데이트 함수 사용
    const { user, updateLoginState } = useAuth(); 

    // const [user, setUser] = useState(null);
    // console.log("헤더 테스트", user);

    // // 로컬 스토리지에서 로그인 상태를 업데이트하는 함수
    // const updateLoginState = () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     if (accessToken) {
    //         const decoded = jwtDecode(accessToken);
    //         console.log(decoded);
    //         setUser(decoded);
    //     } else {
    //         setUser(null);
    //     }
    // };

    // useEffect(() => {
    //     // 로그인 성공 시 발생하는 커스텀 이벤트를 감지하고 처리하는 함수
    //     const handleLoginSuccess = () => {
    //         // 로그인 상태를 업데이트하는 기존 함수 호출
    //         updateLoginState(); 
    //     };
    //     window.addEventListener("loginSuccess", handleLoginSuccess);
    //     // 컴포넌트 언마운트 시 이벤트 리스너 제거
    //     return () => {
    //         window.removeEventListener("loginSuccess", handleLoginSuccess);
    //     };
    // }, []);

    // 로그아웃 함수
    const handleLogout = (event) => {
        // 이벤트 기본 동작 방지
        event.preventDefault(); 
        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('accessToken');
        // // 로그인 상태 업데이트
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
                                <p>MyBook</p>
                                {subMenuStates.myBook && (
                                    <ul className="subMenu">
                                        <li><a href="/Make">동화 만들기</a></li>
                                        <li><a href="/">내 동화</a></li>
                                    </ul>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('voice')} onMouseLeave={() => handleMouseLeave('voice')}>
                                <p>목소리</p>
                                {subMenuStates.voice && (
                                    <ul className="subMenu">
                                        <li><a href="/Clone">목소리 등록</a></li>
                                    </ul>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('myPage')} onMouseLeave={() => handleMouseLeave('myPage')}>
                                <p>마이페이지</p>
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
