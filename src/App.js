import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/Login';
import Enroll from './pages/user/Enroll';
import './App.css';
import Dubing from './pages/fairytale/Dubing';
import Make from './pages/fairytale/Make'
import Info from './pages/mypage/Info'
import { AuthProvider } from './components/auth/AuthContext';
import Voice from './pages/voiceCloning/Voice';
import BookContent from './pages/fairytale/BookContent';


function App() {

  return (

    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route>
            <Route path='login' element={ <Login/> }/>
            <Route path='enroll' element={ <Enroll/> }/>
          </Route>

          <Route path='/' element={<Layout/>}>
            <Route index element={ <Main/> }/>
            <Route path='dubing' element={ <Dubing/> }/>
            <Route path="make" element={ <Make/> }/>
            <Route path="info" element={ <Info/> }/>
            <Route path="bookContent" element={ <BookContent/> }/>
          </Route>

        </Routes>

      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;