import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../../apis/AuthAPI";
import "../../styles/auth/Find.css"

function FindPw() { 
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const [nameMsg, setNameMsg] = useState("");
    const [idMsg, setIdMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");

    const nameRule = /^[가-힣]{1,10}$/;
    const idRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const phoneRule = /^\d{11}$/;

    const nameHandler = useCallback((e) => {
        const entName = e.target.value;
        setUserName(entName);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = nameRule.test(entName);
        setNameMsg(isValid ? "✅" : "이름을 한글로 입력해 주세요. 10자를 초과할 수 없습니다.");
    }, []);

    const idHandler = useCallback((e) => {
        const entId = e.target.value;
        setUserId(entId);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = idRule.test(entId);
        setIdMsg(isValid ? "✅" : "아이디를 영문과 숫자를 포함해 6~12자로 입력해 주세요.");
    }, []);

    const phoneHandler = useCallback((e) => {
        const entPhone = e.target.value;
        setPhoneNum(entPhone);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = phoneRule.test(entPhone);
        setPhoneMsg(isValid ? "✅" : "휴대폰번호를 숫자로만 입력해 주세요.");
    }, []);
    

    return (
        <>
            <div className="find-logo">
                <img src="images/dorering_logo.png" alt="Logo" />
            </div>
            <div className="find-container">
                <div className="find-header">
                    <div className="find-options">
                        <h2 className="find-option" id="find-id">아이디 찾기</h2>
                        <h2 className="find-option" id="find-password">비밀번호 찾기</h2>
                    </div>
                </div>
                <h3 className="find-subtitle">휴대폰번호로 비밀번호 찾기</h3>
                <form className="find-form">
                    <div className="find-input-group">
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            className="find-input"
                            placeholder="아이디를 입력해 주세요."
                            value={userId}
                            onChange={idHandler}
                        />
                        <div className="ruleMsg">{idMsg}</div>
                    </div>
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
export default FindPw;