import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login.js'
import Regist from './pages/regist/regist.js'
import { Provider } from 'react-redux'
import configStore from './store/index.js'
import Layout from './pages/layout/layout.js'
import PrivateRoute from './privateRoute'
const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
     <Routes>
       <Route path = '/' element = {<App/>} />
       <Route path = '/user/login' element = {<Login/>} />
       <Route path = '/user/regist' element = {<Regist/>} />
       <Route element = {<PrivateRoute/>}>
        <Route path = '/layout' element={<Layout/>}></Route>
       </Route>
       
     </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
  
)

reportWebVitals()
