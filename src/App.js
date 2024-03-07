import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/Login';
import Enroll from './pages/user/Enroll';
import './App.css';
import Dubing from './pages/fairytale/Dubing';
import Make from './pages/fairytale/Make'
import Deelp from './pages/fairytale/Deelp';
import Clone from './pages/clone/Clone';
import Info from './pages/mypage/Info'


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route index element={ <Main/> }/>
          <Route path='login' element={ <Login/> }/>
          <Route path='dubing' element={ <Dubing/> }/>
          <Route path='enroll' element={ <Enroll/> }/>
          <Route path="make" element={ <Make/> }/>
          <Route path="deelp" element={ <Deelp/> }/>
          <Route path="clone" element={ <Clone/> }/>
          <Route path="info" element={ <Info/> }/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;