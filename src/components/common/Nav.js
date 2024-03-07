import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../styles/mains/Header.css";
import "../../styles/common/Common.css";

function Nav() {

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

        return (
            <>
                <div className="headerBox">
                    <div className="mainWrap">
                        <ul className="mainMenu">
                        <li onMouseEnter={() => handleMouseEnter('myBook')} onMouseLeave={() => handleMouseLeave("myBook")}>
                            <NavLink to={"/"}>MyBook</NavLink>
                            {subMenuStates.myBook && (
                                <ul className="subMenu">
                                    <li><NavLink to={"/make"}>동화 만들기</NavLink></li>
                                    <li><NavLink to={"/"}>내 동화</NavLink></li>
                                </ul>
                            )}
                            </li>
                        </ul>
                        {/* <div><NavLink to={"/"}>동화 만들기</NavLink></div>
                        <div><NavLink to={"/"}>내 동화</NavLink></div>
                        <div><NavLink to={"/"}>목소리</NavLink></div>
                        <div><NavLink to={"/"}>목소리 등록</NavLink></div>
                        <div><NavLink to={"/"}>마이페이지</NavLink></div>
                        <div><NavLink to={"/"}>내 정보</NavLink></div>
                        <div><NavLink to={"/deelp"}>Deelp</NavLink></div> */}
                    </div>
                </div>
            </>
        );
    }
}
export default Nav;