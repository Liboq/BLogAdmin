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
import { hasPermission } from './utils/hooks'

const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  
    <Provider store={store}>
     <BrowserRouter>
     <Routes >
       <Route path = '/' element = {<App/>} />
       <Route path = '/user/login' element = {<Login/>} />
       {/* <Route path = '/user/regist' element = {<Regist/>} /> */}
       <Route element = {<PrivateRoute/>}>
        <Route path = '/layout' element={<Layout/>}>
          <Route  index element = {<Home></Home>}></Route>
          {hasPermission(1001)&&<Route  path = 'markdown' element ={<Markdown/>}></Route>}
          {hasPermission(100101)&&<Route path='addArt' element={<AddArt/>}></Route>}
          {/* <Route path='editArt/:id' element={<AddArt/>}></Route> */}
          {hasPermission(1002)&&<Route path= "about" element = {<About/>}></Route>}
          {hasPermission(1003)&&<Route path= "message" element = {<Message/>}></Route>}
          {hasPermission(1004)&&<Route path= "gollery" element = {<Gollery/>}></Route>}
          {hasPermission(100404)&&<Route path= "addGollery" element = {<AddGollery/>}></Route>}
          {hasPermission(1005)&&<Route path= "echarts/chinaMap" element = {<ChinaMap/>}></Route>}
          {hasPermission(1006)&&<Route path= "others" element = {<Others/>}></Route>}
          {hasPermission(100701)&&<Route path= "resource/role" element = {<Role/>}></Route>}
          {hasPermission(100702)&&<Route path= "resource/permission" element = {<Permission/>}></Route>}
          {hasPermission(100703)&&<Route path= "resource/user" element = {<UserManage/>}></Route>}

        </Route>
       </Route>
       <Route path='*' element={<NotFund />}></Route>
       
     </Routes>
    </BrowserRouter>
    </Provider>
  
)

reportWebVitals()
