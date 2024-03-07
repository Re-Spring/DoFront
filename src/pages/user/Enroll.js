import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userEnrollAPI } from "../../apis/AuthAPI";

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
    const nameHandler = useCallback(async (e) => {
        const entName = e.target.value;
        setUserName(entName);

        // 이름 유효성 검사 후 메시지 설정
        if(!validateName){
            setNameMsg("이름을 한글로 입력해 주세요. 10자를 초과할 수 없습니다.")
        } else {
            setNameMsg("✅")
        }
    });

    const idHandler = useCallback(async (e) => {
        const entId = e.target.value;
        setUserId(entId);

        if(!validateId){
            setIdMsg("아이디를 영문과 숫자를 포함해 6~12자로 입력해 주세요.")
        } else {
            setIdMsg("✅")
        }
    });

    const pwdHandler = useCallback(async (e) => {
        const entPwd = e.target.value;
        setPwd(entPwd);

        if(!validatePwd){
            setPwdMsg("비밀번호를 영문과 숫자, 특수문자를 포함해 8~20자로 입력해 주세요.")
        } else {
            setPwdMsg("✅")
        }
    });

    const pwdConfirmHandler = useCallback(async (e) => {
        const entPwdConfirm = e.target.value;
        setPwdConfirm(entPwdConfirm);

        if(!validatePwdConfirm){
            setPwdConfirmMsg("비밀번호를 동일하게 입력해 주세요.")
        } else {
            setPwdConfirmMsg("✅")
        }
    });

    const phoneHandler = useCallback(async (e) => {
        const entPhone = e.target.value;
        setPhone(entPhone);

        if(!validatePhone){
            setPhoneMsg("휴대폰번호를 숫자로만 입력해 주세요.")
        } else {
            setPhoneMsg("✅")
        }
    });

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
        <>
            <img src="images/dorering_logo.png"/>
            <div>
                <h1>회원가입</h1>
                <form onSubmit={enrollHandler}>

                    <label htmlFor="userName">이름</label><br/>
                    <input type="text" id="userName" placeholder="이름을 입력해 주세요." required 
                        value={userName} onChange={nameHandler}/>
                    <div className="ruleMsg">{nameMsg}</div>

                    <label htmlFor="userId">아이디</label><br/>
                    <input type="text" id="userId" placeholder="영문과 숫자를 포함해 6~12자로 입력해 주세요." required
                        value={userId} onChange={idHandler} />
                    <div className="ruleMsg">{idMsg}</div>

                    <label htmlFor="pwd">비밀번호</label><br/>
                    <input type="password" id="pwd" placeholder="영문, 숫자, 특수문자를 포함해 8~20자로 입력해 주세요." required
                        value={pwd} onChange={pwdHandler} />
                    <div className="ruleMsg">{pwdMsg}</div>

                    <label htmlFor="pwdConfirm">비밀번호 재입력</label><br/>
                    <input type="password" id="pwdConfirm" placeholder="비밀번호를 한번 더 입력해 주세요." required
                        value={pwdConfirm} onChange={pwdConfirmHandler} />
                    <div className="ruleMsg">{pwdConfirmMsg}</div>

                    <label htmlFor="phone">휴대폰번호</label><br/>
                    <input type="text" id="phone" placeholder="숫자만 입력해 주세요." required
                        value={phone} onChange={phoneHandler} />
                    <div className="ruleMsg">{phoneMsg}</div>

                    <button type="submit" disabled={!validateEnroll}>회원가입</button>
                </form>
            </div>
        </>
    )
}
export default Enroll;