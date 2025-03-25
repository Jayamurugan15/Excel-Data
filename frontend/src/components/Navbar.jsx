import React from 'react'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-center p-4  sm:p-6 sm:px-24 absolute top-0'>
        <h1 className='text-xl md:text-2xl '>Data Visualization</h1>
        <button
        onClick={()=>navigate("/signup")} 
        className='
         rounded-lg bg-blue-600 text-white text-sm px-6 py-2 
        hover:bg-blue-700 transition-all hidden md:block'>Sign Up<i className='fa-solid fa-arrow-right'></i> </button>
    </div>
  )
}

export default Navbar