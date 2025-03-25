import React from 'react'
import asset from "../assets/assets.js"
import { useNavigate } from 'react-router-dom'


export const Header = () => {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center mt-20 text-center text-gray-800'>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Developer 
            <img className='w-8 aspect-square' src={asset.wave} alt="" />
        </h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
        <p className=' text-xl mb-8 max-w-md'>Let's start by Sign Up</p>
        <button
        onClick={()=>navigate("/signup")} 
        className='
         rounded-lg bg-blue-600 text-white text-sm px-6 py-2 
        hover:bg-blue-700 transition-all  md:hidden'>Sign Up<i className='fa-solid fa-arrow-right'></i> </button>
    </div>
  )
}
