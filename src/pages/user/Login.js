import { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../../apis/AuthAPI";
import "../../styles/user/Login.css";
import { useAuth } from "../../components/auth/AuthContext";

function Login() { 

    const { logout } = useAuth();
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
                                                              
        dispatch(userLoginAPI({
            userId, password, navigate, logout
        }));
    }

    function toEnroll(e) {window.location.href = "/enroll"}

    return (
        <>
        <div className="login">
            <a href="/">
                <img src="../images/logo.png" alt="" className="loginLogo" />
            </a>
            <div className="loginBox">
                <p className="loginName">로그인</p>
                <div>
                    <input type="text" className="idInpput" id="userId" placeholder="아이디를 입력해 주세요." ref={idInputRef} required /><br/>
                    <input type="password" className="passwordInput" id="password" placeholder="비밀번호를 입력해 주세요." ref={pwdInputRef} onKeyPress={handleKeyPress} required />
                </div>
                <button onClick={loginHandler} className="loginBtn">로그인</button>
                <div>
                    <p className="findInfo"><NavLink to="/findId">아이디/비밀번호 찾기</NavLink></p>
                </div>
                <div>
                    <button onClick={toEnroll} className="loginEnrollBtn">회원가입</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;