import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/login/login.js'
import Regist from './pages/regist/regist.js'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <Routes>
       <Route path = '/' element = {<App/>} /> 
       <Route path = '/user/login' element = {<Login/>} />
       <Route path = '/user/regist' element = {<Regist/>} />
     </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
