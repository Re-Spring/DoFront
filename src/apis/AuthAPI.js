import Swal from 'sweetalert2';
import axios from "axios";
import { getFindId, getFindPw, postEnroll, postLogin, postModifyPw } from '../modules/AuthModule';
import { jwtDecode } from 'jwt-decode';


export const userEnrollAPI = ({userData, navigate}) => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/auth/enroll`;

    return async (dispatch, getState) => {
        await axios.post(requestURL, userData)
            .then(function (response) {
                console.log(response);
                // 성공적으로 가입 처리된 경우
                if(response.status === 200){
                    // 액션 생성자 함수를 호출하여 액션 객체 생성 및 디스패치
                    dispatch(postEnroll(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "가입 완료",
                        text: "가입이 완료되었습니다! 로그인 페이지로 이동합니다.",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate("/login", { replace: true });
                        }
                    });
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("회원 가입 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "가입 시도 중 오류가 발생했습니다",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

// let logoutTimer;

export const userLoginAPI = ({userId, password, navigate, logout}) => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/auth/login`;
    console.log("api 전 : ", userId, password);
    return async (dispatch, getState) => {
        await axios.post(requestURL, {userId, password}, 
            {
                headers: {
                    'Content-Type': 'application/json' // 명시적으로 Content-Type 설정
                }
            })
            .then(function (response) {
                console.log(response);
                // 성공적으로 로그인 처리된 경우
                if(response.status === 200){
                    // 토큰을 상태로 저장하거나 로컬/세션 스토리지에 저장하는 로직 추가
                    const accessToken = response.data.accessToken;
                    // 로컬 스토리지에 토큰 저장
                    localStorage.setItem('accessToken', accessToken);
                    console.log("토큰 확인 : ", accessToken);
                    console.log("토큰 디코딩 확인 : ", jwtDecode(accessToken));
                    // 상태 업데이트
                    dispatch(postLogin(response.data));
                    // logoutTimer = setTimeout(logout, loginTokenHandler(jwtDecode(accessToken).exp));
                    // loginTokenHandler(jwtDecode(accessToken).exp, logout);
                    Swal.fire({
                        icon: 'success',
                        title: "로그인 되었습니다",
                        text: "메인화면으로 이동합니다.",
                        confirmButtonText: "확인"
                    }).then(result => {
                        if(result.isConfirmed){
                            navigate("/", { replace: true });
                            // 로그인 성공 이벤트 발생
                            window.dispatchEvent(new CustomEvent("loginSuccess"));
                            // 헤더 수정에 너무 많은 시간이 소요되고 있는 까닭으로 navigate 직후 새로고침을 실행하는 편법을 사용했습니다. 테스트 기간에 고칠게요........
                            // navigate 후에 페이지 새로고침
                            setTimeout(() => {
                                window.location.reload();
                            }, 100); // 100ms 후에 페이지를 새로고침합니다. 이 값은 조정 가능합니다.
                        }
                    });
                }   
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("로그인 중 오류 발생: ", error);
                console.log("로그인 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "로그인 시도 중 오류가 발생했습니다",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

export const findIdAPI = ({userName, phoneNum}) => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/auth/findId/` + userName + '/' + phoneNum;
    const body = { userName: userName, phone: phoneNum };
    return async (dispatch, getState) => {
        await axios.get(requestURL, body)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    const userId = response.data;
                    console.log("아이디 찾기 확인 : ", userId);
                    dispatch(getFindId(response.data));
                    Swal.fire({
                        icon: 'success',
                        title: "아이디 찾기",
                        text: `회원님의 아이디는 ${userId} 입니다.`,
                        confirmButtonText: "닫기"
                    })
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("아이디 찾기 중 오류 발생: ", error);
                console.log("아이디 찾기 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "아이디 찾기 중 오류가 발생했습니다",
                    text: error.response.status == 400 ? "이름 혹은 휴대폰번호를 다시 확인해 주세요.\n문제가 지속될 경우 고객센터로 문의 바랍니다." : "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

export const findPwAPI = ({userName, userId, phoneNum, navigate}) => {
    const requestURL = `http://${process.env.REACT_APP_API_IP}:8001/auth/findPw/` + userName + '/' + userId + '/' + phoneNum;
    const body = { userName: userName, userId: userId, phone: phoneNum };
    return async (dispatch, getState) => {
        await axios.get(requestURL, body)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    console.log("비밀번호 찾기 확인 : ", response.data);
                    dispatch(getFindPw(response.data));
                    Swal.fire({
                        title: "변경할 비밀번호를 입력하세요",
                        input: "password",
                        inputLabel: "영문과 숫자, 특수문자를 포함해 8~20자로 입력해 주세요",
                        confirmButtonText: "변경하기",
                        showCancelButton: true,
                        cancelButtonText: "닫기",
                        showLoaderOnConfirm: true,
                        inputAttributes: {
                            maxlength: "20",
                            autocapitalize: "off",
                            autocorrect: "off"
                        },
                        inputValidator: (value) => {
                            const pwdRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

                            if (!value) {
                              return "새 비밀번호를 입력해 주세요!";
                            } 
                            else if(!pwdRule.test(value)) {
                                return "비밀번호를 규칙에 맞게 입력해 주세요!";
                            }
                        },
                        preConfirm: async (newPassword) => {
                            try {
                                const result = await modifyPwAPI(userId, newPassword, dispatch);
                                return result;
                            } catch (error) {
                                Swal.showValidationMessage(error.message);
                            }
                        }
                    }).then((result1) => {
                        if (result1.isConfirmed) {
                            Swal.fire({
                                icon: 'success',
                                title: "비밀번호가 변경되었습니다!",
                                text: "확인 버튼을 누르면 로그인 화면으로 이동합니다.",
                                confirmButtonText: "확인"
                            })
                            .then(result2 => {
                                if(result2.isConfirmed){
                                    navigate("/login", { replace: true });;
                                }
                            });
                        }
                    })
                    .catch(function (error) { 
                        console.log("비밀번호 변경 중 오류 발생: ", error);
                        Swal.fire({
                            icon: 'error',
                            title: error.response.status == 400 ? error.response.data : "비밀번호 변경 중 오류가 발생했습니다",
                            text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                            confirmButtonText: "확인"
                        });
                    })
                }
            })
            .catch(function (error) {
                // 백엔드에서 보낸 에러 메시지 처리
                console.log("비밀번호 찾기 중 오류 발생: ", error);
                console.log("비밀번호 찾기 중 오류 발생: ", error.response);
                Swal.fire({
                    icon: 'error',
                    title: error.response.status == 400 ? error.response.data : "비밀번호 찾기 중 오류가 발생했습니다",
                    text: error.response.status == 400 ? "입력하신 정보를 다시 확인해 주세요.\n문제가 지속될 경우 고객센터로 문의 바랍니다." : "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    confirmButtonText: "확인"
                });
            });
    }
}

const modifyPwAPI = async (userId, newPassword, dispatch) => {
    console.log(userId, newPassword);
    const url = `http://${process.env.REACT_APP_API_IP}:8001/auth/setPwd`;
    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('newPassword', newPassword);
    
    try {
        const response = await axios.post(url, params);
        console.log("변경 결과 response 확인 : ", response);
        // 서버 응답이 성공(200 OK)이 아닌 경우 오류를 throw하고 해당 오류 메시지 처리
        if (response.status !== 200) {
            console.log(response.statusText);
            throw new Error("다시 시도해 주세요. 불편을 드려 죄송합니다.");
        }

        dispatch(postModifyPw(response.data));

        // 서버 응답의 JSON 데이터 반환
        return response.data;
    } catch (error) {
        // 요청이 실패하면 오류 메시지 throw
        console.log("비밀번호 변경 에러 발생 : ", error)
        throw new Error("다시 시도해 주세요. 불편을 드려 죄송합니다.");
    }
};
