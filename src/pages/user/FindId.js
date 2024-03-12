import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { findIdAPI, userLoginAPI } from "../../apis/AuthAPI";
import "../../styles/auth/Find.css"

function FindId() { 

    const dispatch = useDispatch();

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
        setPhoneMsg(isValid ? "✅" : "휴대폰번호를 정확하게 입력해 주세요.");
    }, []);
    
    const findIdHandler = async (e) => {
        e.preventDefault();

        dispatch(findIdAPI({
            userName, phoneNum
        }));
    };
      
    // document.getElementById('find-password').addEventListener('click', function() {
    //     window.location.href = '/findPw'; // 비밀번호 찾기 페이지 URL
    // });

    return (
        <>
            <div className="findeLogoBox">
                <a href="/">
                    <img src="images/logo.png" className="find-logo" alt="Logo" />
                </a>
            </div>
            <div className="find-container">
                <div className="find-header">
                    <div className="find-options">
                        <p className="find-option" id="find-id">아이디 찾기</p>
                        <p className="find-option" id="find-password"><Link to="/findPw">비밀번호 찾기</Link></p>
                    </div>
                </div>
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
                            required
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
                            required
                        />
                        <div className="ruleMsg">{phoneMsg}</div>
                    </div>
                    <div className="findButtonBox">
                        <button type="submit" className="find-button">확인</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default FindId;