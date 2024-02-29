import  "../../styles/mains/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {

    return (
        <>
            <div className="headerBox"> 
                <div className="headerWrap">
                    <a href="/" style={{height:"30px"}}><img src="../images/logo.png" alt="" className={"logo"}/></a>
                    <div className="searchBox">
                        <input className="searchInput" type="text" placeholder="동화 검색"/>
                        <button className="searchBtn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className="homeLogin">
                        <button>로그인</button>
                        <button>회원가입</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;