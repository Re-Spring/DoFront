import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CustomerService from './pages/mypage/CustomerService';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/Login';
import Enroll from './pages/user/Enroll';
import './App.css';
import Dubing from './pages/fairytale/Dubing';
import Make from './pages/fairytale/Make'
import Info from './pages/mypage/Info'
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Voice from './pages/voiceCloning/Voice';
import BookContent from './pages/fairytale/BookContent';
import { PublicRoute, RequireAuth } from './components/auth/AuthPath';
import FindId from './pages/user/FindId';
import FindPw from './pages/user/FindPw';
import SearchPage from './pages/fairytale/SearchPage'; // SearchPage 컴포넌트의 경로에 맞게 조정해주세요.
import CustomerServicePosts from './pages/mypage/CustomerServicePosts';
import CustomerServicePostDetail from './pages/mypage/CustomerServicePostDetail';
import { SessionTimeout } from './components/auth/SessionTimeout';
import MyBook from './pages/fairytale/MyBook';
import UserInfo from './pages/admin/UserInfo';
import { firebaseApp } from './configs/Firebase';
import { getToken, getMessaging } from 'firebase/messaging';
import { TokenProvider , useToken } from './components/token/TokenContext';

function App() {

   const { setToken } = useToken();

   useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    // 알림 권한 요청
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // FCM 토큰 획득
        getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              localStorage.setItem('fcmToken', currentToken);
//              setToken(currentToken); // 저장
            } else {
            }
          }).catch((err) => {
          });
      } else {
      }
    });
  }, []);

  return (
    <TokenProvider>
        <AuthProvider>
          <BrowserRouter>

            <Routes>

          <Route path='/' element={<Layout/>}>
            <Route index element={ <Main/> }/>
            <Route path="bookContent/:fairytaleCode" element={<BookContent />} />
            <Route path='dubing' element={ <RequireAuth><Dubing/></RequireAuth> }/>
            <Route path="make" element={ <RequireAuth><Make/></RequireAuth> }/>
            <Route path="info" element={ <RequireAuth><Info/></RequireAuth> }/>
            <Route path="voice" element={ <RequireAuth><Voice/></RequireAuth> }/>
            <Route path="CustomerService" element={<CustomerService/>} />
            <Route path="CustomerServicePosts" element={<CustomerServicePosts/>} />
            <Route path="/customer-service/:boardCode" element={<CustomerServicePostDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search" element={ <SearchPage /> } />
            <Route path="mybook" element={ <RequireAuth><MyBook /></RequireAuth> } />
            <Route path="userInfo" element={ <RequireAuth><UserInfo /></RequireAuth> } />
          </Route>

          <Route path='login' element={ <PublicRoute><Login/></PublicRoute> }/>
          <Route path='enroll' element={ <PublicRoute><Enroll/></PublicRoute> }/>
          <Route path='findId' element={ <PublicRoute><FindId/></PublicRoute> }/>
          <Route path='findPw' element={ <PublicRoute><FindPw/></PublicRoute> }/>

            </Routes>
          </BrowserRouter>
          <SessionManager />
        </AuthProvider>
    </TokenProvider>

  );
}

function SessionManager() {
  SessionTimeout();
  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}

export default App;