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
        console.log('Message received. ', payload);
        // 포그라운드에서 사용자에게 알림 표시
        if ('Notification' in window) {
            let notificationOptions = {
                body: payload.notification.body,
                // icon: payload.notification.icon
            };
            new window.Notification(payload.notification.title, notificationOptions);
        }
    });
  } else {
    console.log("This browser doesn't support Firebase Cloud Messaging");
  }
});
