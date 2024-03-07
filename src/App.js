import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/Login';
import Enroll from './pages/user/Enroll';
import './App.css';
import Dubing from './pages/fairytale/Dubing';
import Make from './pages/fairytale/Make'
import Deelp from './pages/fairytale/Deelp';

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
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
