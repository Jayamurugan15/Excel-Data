import React from 'react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Appcontent } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'


export const Login = () => {

  const {backendurl,setisLoggedin,getUserData} = useContext(Appcontent)

  const [state, setstate] = useState("login");
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 const submitHander = async (e) => {
    try {
      e.preventDefault();

      if(state === 'login'){
        const {data} = await axios.post(backendurl + '/api/user/login',{email,password},{withCredentials:true});
        if(data.success){
          setisLoggedin(true);
          getUserData();
          navigate('/dashboard');
        }else{
          toast.error(data.message)
        } 
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-[url("/bg_img.png")] bg-cover'>
      <div className='flex flex-col items-center justify-center  bg-white border rounded-lg shadow-xl w-full sm:w-96 text-indigo-300 text-sm'>
      <h1 className='text-2xl md:text-3xll mt-3 font-semibold text-center text-black mb-3'>Login </h1>
      <p className='text-center text-sm text-gray-500 mb-6'>Login to your account</p>
      
      <form onSubmit={submitHander}>
      
      <div className=' flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-gray-400 text-gray-700  '>
        <img 
        className='text-black'
        src="/mail_icon.svg" alt="" />
        <input 
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        className='bg-transparent outline-none '
        type="email" placeholder='Email' required />
      </div>
      <div className=' flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-gray-400 text-gray-700 '>
        <img src="/lock_icon.svg" alt="" />
        <input 
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        className='bg-transparent outline-none '
        type="password" placeholder='Password' required/>
      </div>

      
      <button className='w-full bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-3'>Login</button>
      
      </form>
      
      <p className='text-gray-600 text-center text-sm mt-3 mb-3'>Don't have an account?  
        <span 
         onClick={()=>{navigate('/signup')}}
        className='text-blue-500 cursor-pointer underline'>Sign up</span></p>


      
      </div>
    </div>
  )
}

