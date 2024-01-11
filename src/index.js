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
import NotFund from './404'
import Home from './pages/layout/home'

import AuthRoute from './router'
import route from './route'
const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<App />} />
        <Route path='/user/login' element={<Login />} />
        {/* <Route path = '/user/regist' element = {<Regist/>} /> */}
        <Route element={<PrivateRoute />}>
          <Route path='/layout' element={<Layout />}>
            <Route index element={<Home></Home>}></Route>
            {route.map(item => {
              return <Route key={item.pid} path={item.path} element={<AuthRoute pid={item.pid}>
                {item.element}
              </AuthRoute>}></Route>
            })}
          </Route>
        </Route>
        <Route path='*' element={<NotFund />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider >

)

reportWebVitals()
