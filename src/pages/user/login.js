import { NavLink } from "react-router-dom";

function Login() { 
    
    const loginHandler = {}

    return (
        <>
        <h1>로그인</h1>
        <div>
            <input type="text" id="userId" placeholder="아이디를 입력해 주세요." required /><br/>
            <input type="password" id="password" placeholder="비밀번호를 입력해 주세요." required />
        </div>
        <button onClick={loginHandler}>로그인</button>
        <div>
            <NavLink to="/findId">아이디/비밀번호 찾기</NavLink>
        </div>
        <div>
            <button>회원가입</button>
        </div>
        </>
    )
}
export default Login;