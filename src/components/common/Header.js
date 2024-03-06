import React, { useState } from 'react';
import "../../styles/mains/header.css";
import "../../styles/common/common.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
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
                                        <li><a href="/">목소리 등록</a></li>
                                    </ul>
                                )}
                            </li>
                            <li onMouseEnter={() => handleMouseEnter('myPage')} onMouseLeave={() => handleMouseLeave('myPage')}>
                                <a href="/">마이페이지</a>
                                {subMenuStates.myPage && (
                                    <ul className="subMenu">
                                        <li><a href="/">내 정보</a></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="homeLogin">
                        <a href="/login">로그인 |</a>
                        <a href="/enroll">회원가입</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
