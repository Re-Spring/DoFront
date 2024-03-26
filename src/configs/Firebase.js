import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import firebaseConfig from './FirebaseConfig';

// Firebase 앱 초기화
export const firebaseApp = initializeApp(firebaseConfig);

// FCM이 지원되는지 확인
isSupported().then((supported) => {
  if (supported) {
    const messaging = getMessaging(firebaseApp);

    // 포그라운드 메시지 수신 처리
    onMessage(messaging, (payload) => {
        // 포그라운드에서 사용자에게 알림 표시
        if ('Notification' in window) {
            let notificationOptions = {
                body: payload.notification.body,
                // icon: payload.notification.icon
                // data: {
                  // click_action: payload.notification.click_action // 알림 클릭시 이동할 URL 저장
              // }
            };
            // 알림 객체 생성하고 변수에 저장
            let notification = new window.Notification(payload.notification.title, notificationOptions);

             // 알림 클릭 이벤트 리스너 추가
              notification.onclick = function(event) {
              event.preventDefault(); // 브라우저의 기본 동작 방지
              const fairytaleCode = payload.data && payload.data.fairytaleCode;
              console.log(fairytaleCode);
              window.location.href = `/bookContent/${fairytaleCode}`; // 클릭시 이동할 URL
              notification.close(); // 알림 닫기
          }
      }
  });
  } else {
    console.log("This browser doesn't support Firebase Cloud Messaging");
  }
});
