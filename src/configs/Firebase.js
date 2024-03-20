// Firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseConfig from './FirebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// 추가 (3/20)
// 포그라운드 메시지 수신 처리
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // 포그라운드에서 사용자에게 알림 표시
    if ('Notification' in window) {
        let notificationOptions = {
            body: payload.notification.body,
//            icon: payload.notification.icon
        };
        new window.Notification(payload.notification.title, notificationOptions);
    }
});

export { firebaseApp, messaging };
