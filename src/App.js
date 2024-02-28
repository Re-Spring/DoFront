import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/fairytale/Main'
import Login from './pages/user/login';
import './App.css';
import Dubing from './pages/fairytale/dubing';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route index element={ <Main/> }/>
          <Route path='login' element={ <Login/> }/>
          <Route path='dubing' element={ <Dubing/> }/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
