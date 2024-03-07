import { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../../apis/AuthAPI";

function Login() { 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const idInputRef = useRef(null);
    const pwdInputRef = useRef(null);

    const handleKeyPress = (e) => {
        if(e.key == 'Enter'){
            loginHandler(e);
        }
    }
    
    const loginHandler = async (e) => {
        e.preventDefault();

        const userId = idInputRef.current.value;
        const password = pwdInputRef.current.value;
                                                              
        console.log(userId, password);

        dispatch(userLoginAPI({
            userId, password, navigate
        }));
    }

    function toEnroll(e) {window.location.href = "/enroll"}

    return (
        <>
        <h1>로그인</h1>
        <div>
            <input type="text" id="userId" placeholder="아이디를 입력해 주세요." ref={idInputRef} required /><br/>
            <input type="password" id="password" placeholder="비밀번호를 입력해 주세요." ref={pwdInputRef} onKeyPress={handleKeyPress} required />
        </div>
        <button onClick={loginHandler}>로그인</button>
        <div>
            <NavLink to="/findId">아이디/비밀번호 찾기</NavLink>
        </div>
        <div>
            <button onClick={toEnroll}>회원가입</button>
        </div>
        </>
    )
}
export default Login;