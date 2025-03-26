import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home.jsx'
import {Login} from './pages/Login.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { Signup } from './pages/Signup.jsx';
import { Profile } from './pages/Profile.jsx';
import { DashboardLayout } from './Layout/DashboardLayout.jsx';
import { Emailverify } from './pages/Emailverify.jsx';
import {ResetPassword} from './pages/ResetPassword.jsx'
import Visual from './pages/Visual.jsx';


const App = () => {
  
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<Profile/>}/>
          <Route path='/dashboard/visual' element={<Visual/>}/>
          <Route path='/dashboard/Email-verify' element={<Emailverify/>}/>
        </Route>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App