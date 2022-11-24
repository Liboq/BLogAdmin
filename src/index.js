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

const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  
  
    <Provider store={store}>
     <BrowserRouter>
     <Routes >
       <Route path = '/' element = {<App/>} />
       <Route path = '/user/login' element = {<Login/>} />
       <Route path = '/user/regist' element = {<Regist/>} />
       <Route element = {<PrivateRoute/>}>
        <Route path = '/layout' element={<Layout/>}>
          <Route  index element = {<Home></Home>}></Route>
          <Route path = 'markdown' element ={<Markdown/>}>
          </Route>
          <Route path='addArt' element={<AddArt/>}></Route>
          {/* <Route path='editArt/:id' element={<AddArt/>}></Route> */}
          <Route path= "about" element = {<About/>}></Route>
          <Route path= "message" element = {<Message/>}></Route>
          <Route path= "gollery" element = {<Gollery/>}></Route>
          <Route path= "addGollery" element = {<AddGollery/>}></Route>
        
        </Route>
       </Route>
       <Route path='*' element={<NotFund />}></Route>
       
     </Routes>
    </BrowserRouter>
    </Provider>
  
)

reportWebVitals()
