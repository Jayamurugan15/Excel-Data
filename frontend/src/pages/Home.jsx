import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Header } from '../components/Header.jsx'
import { SideBar } from '../components/SideBar/SideBar.jsx'


export const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen
    bg-[url("/bg_img.png")] bg-cover'>
      <Navbar/>
      <Header/>
    </div>
  )
}
