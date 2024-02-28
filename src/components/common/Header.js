import headercss from "../../styles/mains/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function Header() {
    return (
        <>
            <div className="headerBox">
                <a href="/"><img src="../images/logo.png" alt="" className={"logo"}/></a>
                <div className="searchBox">
                    <input className="searchInput" type="text" placeholder="동화 검색"/>
                    <button className="searchBtn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header;