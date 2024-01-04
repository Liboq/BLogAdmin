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
import Markdown from './pages/layout/markdown'
import Home from './pages/layout/home'
import About from './pages/layout/about'
import AddArt from './components/article/AddArt'
import Message from './pages/layout/message'
import Gollery from './pages/layout/gollery'
import AddGollery from './components/gollery/addGollery'
import Others from './pages/layout/others'
import ChinaMap from './pages/layout/echarts/china'
import Role from './pages/layout/resource/role'
import Permission from './pages/layout/resource/permission'
import UserManage from './pages/layout/resource/user'
import AuthRoute from './router'

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
            <Route path='markdown' element={<AuthRoute pid="1001">
              <Markdown />
            </AuthRoute>}></Route>
            <Route path='addArt' element={<AuthRoute pid="100101">
              <AddArt />
            </AuthRoute>}></Route>
            <Route path='about' element={<AuthRoute pid="1002">
              <About />
            </AuthRoute>}></Route>
            <Route path='message' element={<AuthRoute pid="1003">
              <Message />
            </AuthRoute>}></Route>
            <Route path='gollery' element={<AuthRoute pid="1004">
              <Gollery />
            </AuthRoute>}></Route>
            <Route path='addGollery' element={<AuthRoute pid="100404">
              <AddGollery />
            </AuthRoute>}></Route>
            <Route path='echarts/chinaMap' element={<AuthRoute pid="1005">
              <ChinaMap />
            </AuthRoute>}></Route>
            <Route path='others' element={<AuthRoute pid="1006">
              <Others />
            </AuthRoute>}></Route>
            <Route path='resource/role' element={<AuthRoute pid="100701">
              <Role />
            </AuthRoute>}></Route>
            <Route path='resource/permission' element={<AuthRoute pid="100702">
              <Permission />
            </AuthRoute>}></Route>
            <Route path='resource/user' element={<AuthRoute pid="100703">
              <UserManage />
            </AuthRoute>}></Route>


          </Route>
        </Route>
        <Route path='*' element={<NotFund />}></Route>

      </Routes>
    </BrowserRouter>
  </Provider>

)

reportWebVitals()
