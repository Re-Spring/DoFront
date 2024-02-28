import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/login';
import Enroll from './pages/user/enroll';
import './App.css';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route index element={ <Main/> }/>
          <Route path='login' element={ <Login/> }/>
          <Route path='enroll' element={ <Enroll/> }/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
