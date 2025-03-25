import React from 'react'
import { SideBar } from './SideBar.jsx'
import {Profile} from "../../pages/Profile.jsx"
import {Outlet} from 'react-router-dom'

import { Routes, Route } from 'react-router-dom'
import { Emailverify } from '../../pages/Emailverify.jsx'
import { ResetPassword } from '../../pages/ResetPassword.jsx'

export const Layout = () => {
  return (
    <div>
        <div className="flex">
            <SideBar/>
            <div>
              <Routes>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/Email-verify' element={<Emailverify/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
              </Routes>
            </div>
        </div>
    </div>
  )
}
