import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userEnrollAPI } from "../../apis/AuthAPI";
import "../../styles/user/Enroll.css";

function Enroll() { 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 입력 값과 유효성 검사 메시지에 대한 상태 관리
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [phone, setPhone] = useState('');

    const [nameMsg, setNameMsg] = useState("");
    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [pwdConfirmMsg, setPwdConfirmMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");

    // 각 입력 필드에 대한 유효성 검사 규칙 정의
    const nameRule = /^[가-힣]{1,10}$/;
    const idRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const pwdRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    const phoneRule = /^\d{11}$/;

    // 입력 값에 대한 유효성 검사 수행
    const validateId = idRule.test(userId);
    const validatePwd = pwdRule.test(pwd);
    const validatePwdConfirm = pwd === pwdConfirm;
    const validateName = nameRule.test(userName);
    const validatePhone = phoneRule.test(phone);

    // 입력 필드 값이 변경될 때마다 유효성 검사 메시지 업데이트
    const nameHandler = useCallback((e) => {
        const entName = e.target.value;
        setUserName(entName);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = nameRule.test(entName);
        setNameMsg(isValid ? "✅" : "한글로만 입력해 주세요. 10자를 초과할 수 없습니다.");
    }, []);

    const idHandler = useCallback((e) => {
        const entId = e.target.value;
        setUserId(entId);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = idRule.test(entId);
        setIdMsg(isValid ? "✅" : "영문과 숫자를 포함해 6~12자로 입력해 주세요.");
    }, []);

    const pwdHandler = useCallback((e) => {
        const entPwd = e.target.value;
        setPwd(entPwd);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = pwdRule.test(entPwd);
        setPwdMsg(isValid ? "✅" : "영문과 숫자, 특수문자를 포함해 8~20자로 입력해 주세요.");
    }, []);

    const pwdConfirmHandler = useCallback((e) => {
        const entPwdConfirm = e.target.value;
        setPwdConfirm(entPwdConfirm);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = pwd === entPwdConfirm;
        setPwdConfirmMsg(isValid ? "✅" : "비밀번호가 일치하지 않습니다.");
    }, [pwd]); // pwd를 의존성 배열에 추가하여 pwd 상태가 변경될 때마다 함수가 업데이트됨

    const phoneHandler = useCallback((e) => {
        const entPhone = e.target.value;
        setPhone(entPhone);

        // 입력값에 대한 유효성 검사를 여기에서 수행
        const isValid = phoneRule.test(entPhone);
        setPhoneMsg(isValid ? "✅" : "숫자로만 입력해 주세요.");
    }, []);

    const validateEnroll = validateId && validateName && validatePhone && validatePwd && validatePwdConfirm

    // 회원가입 요청을 처리하는 함수
    const enrollHandler = async (e) => {
        // 폼 제출 이벤트 방지
        e.preventDefault();
        console.log(userId, pwd, userName, phone);

        const userData = {
            userName: userName, 
            userId: userId, 
            password: pwd, 
            phone: phone
        };
        dispatch(userEnrollAPI({
            userData, navigate
        }));
    };

    // JSX에서 form 요소와 입력 필드를 렌더링, 각 핸들러 함수와 상태 연결
    return (
        <div className="enroll">
            <div className="enrollLogoBox">
                <a href="/">
                    <img src="images/logo.png" className="enrollLogo" />
                </a>
            </div>

            <div className="enrollBox">
                <p className="enrollName">회원가입</p>
                <form onSubmit={enrollHandler}>

                    <div className="enrollInputBox">
                        <label htmlFor="userName" className="labelName">이름</label>
                        <input type="text" className="enrollInput" id="userName" placeholder="이름을 입력해 주세요." required 
                            value={userName} onChange={nameHandler}/>
                        <div className="ruleMsg">{nameMsg}</div>
                    </div>

                    <div className="enrollInputBox">
                        <label htmlFor="userId" className="labelName">아이디</label>
                        <input type="text" className="enrollInput" id="userId" placeholder="영문과 숫자를 포함해 6~12자로 입력해 주세요." required
                            value={userId} onChange={idHandler} />
                        <div className="ruleMsg">{idMsg}</div>
                    </div>

                    <div className="enrollInputBox">
                        <label htmlFor="pwd" className="labelName">비밀번호</label>
                        <input type="password" className="enrollInput" id="pwd" placeholder="영문, 숫자, 특수문자를 포함해 8~20자로 입력해 주세요." required
                            value={pwd} onChange={pwdHandler} />
                        <div className="ruleMsg">{pwdMsg}</div>
                    </div>

                    <div className="enrollInputBox">
                        <label htmlFor="pwdConfirm" className="labelName">비밀번호 재입력</label>
                        <input type="password" className="enrollInput" id="pwdConfirm" placeholder="비밀번호를 한번 더 입력해 주세요." required
                            value={pwdConfirm} onChange={pwdConfirmHandler} />
                        <div className="ruleMsg">{pwdConfirmMsg}</div>
                    </div>

                    <div className="enrollInputBox">
                        <label htmlFor="phone" className="labelName">휴대폰번호</label>
                        <input type="text" className="enrollInput" id="phone" placeholder="숫자만 입력해 주세요." required
                            value={phone} onChange={phoneHandler} />
                        <div className="ruleMsg">{phoneMsg}</div>
                    </div>

                    <div className="enrollBtnBox">
                        <button type="submit" disabled={!validateEnroll} className="enrollBtn">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Enroll;