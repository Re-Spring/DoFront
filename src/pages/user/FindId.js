import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../../apis/AuthAPI";
import "../../styles/auth/Find.css"

function FindId() { 
    const [userName, setUserName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const [nameMsg, setNameMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");

    const nameRule = /^[가-힣]{1,10}$/;
    const phoneRule = /^\d{11}$/;

    const nameHandler = useCallback((e) => {
        const entName = e.target.value;
        setUserName(entName);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = nameRule.test(entName);
        setNameMsg(isValid ? "✅" : "이름을 한글로 입력해 주세요. 10자를 초과할 수 없습니다.");
    }, []);

    const phoneHandler = useCallback((e) => {
        const entPhone = e.target.value;
        setPhoneNum(entPhone);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = phoneRule.test(entPhone);
        setPhoneMsg(isValid ? "✅" : "휴대폰번호를 숫자로만 입력해 주세요.");
    }, []);
    
    const findIdHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="find-logo">
                <img src="images/dorering_logo.png" alt="Logo" />
            </div>
            <div className="find-container">
                <div className="find-header">
                    <div className="find-options">
                        <h2 className="find-option" id="find-id">아이디 찾기</h2>
                        <h2 className="find-option" id="find-password" href="/findPw">비밀번호 찾기</h2>
                    </div>
                </div>
                <h3 className="find-subtitle">휴대폰번호로 아이디 찾기</h3>
                <form className="find-form" onSubmit={findIdHandler}>
                    <div className="find-input-group">
                        <label htmlFor="userName">이름</label>
                        <input
                            type="text"
                            id="userName"
                            className="find-input"
                            placeholder="이름을 입력해 주세요."
                            value={userName}
                            onChange={nameHandler}
                        />
                        <div className="ruleMsg">{nameMsg}</div>
                    </div>
                    <div className="find-input-group">
                        <label htmlFor="phoneNum">휴대폰번호</label>
                        <input
                            type="text"
                            id="phoneNum"
                            className="find-input"
                            placeholder="숫자만 입력해 주세요."
                            value={phoneNum}
                            onChange={phoneHandler}
                        />
                        <div className="ruleMsg">{phoneMsg}</div>
                    </div>
                    <button type="submit" className="find-button">확인</button>
                </form>
            </div>
        </>
    )
}
export default FindId;