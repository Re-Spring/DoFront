import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { PublicRoute, RequireAuth } from './components/auth/AuthPath';


function App() {

  return (

    <AuthProvider>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Layout/>}>
            <Route index element={ <Main/> }/>
            <Route path='login' element={ <PublicRoute><Login/></PublicRoute> }/>
            <Route path='dubing' element={ <RequireAuth><Dubing/></RequireAuth> }/>
            <Route path='enroll' element={ <PublicRoute><Enroll/></PublicRoute> }/>
            <Route path="make" element={ <RequireAuth><Make/></RequireAuth> }/>
            <Route path="info" element={ <RequireAuth><Info/></RequireAuth> }/>
          </Route>

        </Routes>

      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;