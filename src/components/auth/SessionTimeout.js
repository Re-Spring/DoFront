import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";

export function SessionTimeout(timeoutDuration = 3600000) { // 기본 타임아웃을 60분(3600000)으로 설정, 30분(1800000ms), 5분(300000ms), 1분(60000ms)
    const { user, updateLoginState } = useAuth();

    useEffect(() => {
        if(!user) {
            // 로그인 상태가 아니면 아무것도 하지 않음
            return;
        }
        const handleActivity = () => {
            // 활동 감지 시 타임아웃 리셋
            localStorage.setItem('lastActivity', new Date().toISOString());
        };

         // 사용자 활동 감지 이벤트 (마우스 클릭, 키보드 입력)
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // 주기적으로 세션 타임아웃 검사
        const intervalId = setInterval(() => {
            const lastActivity = localStorage.getItem('lastActivity');
            const now = new Date();
            const lastActivityDate = lastActivity ? new Date(lastActivity) : new Date();
            if (now.getTime() - lastActivityDate.getTime() > timeoutDuration) {
                // 타임아웃 시 로그아웃 처리
                console.log('Session timeout. Logging out...');
                // 로그아웃 로직을 여기에 구현...
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tempVoiceCode');
                Swal.fire({
                    icon: 'info',
                    title: "다시 로그인 해주세요",
                    text: "일정 시간 동안 활동이 감지되지 않아 로그아웃 되었습니다.",
                    confirmButtonText: "확인"
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                });
            }
        }, 300000); // 5분마다 검사

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 및 인터벌 제거
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            clearInterval(intervalId);
        };
    }, [timeoutDuration, user]);
}