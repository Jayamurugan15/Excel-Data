import React, { useContext } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { Appcontent } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { GoogleLogIn } from './GoogleLogin.jsx';


export const Signup = () => {
  
     const [state,setState] = useState("sign up")
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const navigate = useNavigate()

     const {backendurl,setisLoggedin} = useContext(Appcontent)

     const submitHander = async (e) => {
        try {
          e.preventDefault();
    
          if(state=== 'sign up'){
            const {data} = await axios.post(backendurl + '/api/user/register',{name,email,password},{withCredentials:true});
           
            if(data){
              setisLoggedin(true);
              toast.success(data.message);
              navigate('/login');
            }else{
              toast.error(data.message)
            }
          }
            
        } catch (error) {
          toast.error(error.message);
        }
      }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-[url("/bg_img.png")] bg-cover md:w-auto '>
    <div className='flex flex-col items-center justify-center  bg-white border rounded-lg shadow-xl w-full sm:w-96 text-indigo-300 text-sm'>
    <h1 className='text-2xl md:text-3xl mt-3 font-semibold text-center text-black mb-3'>Create Account</h1>
    <p className='text-center text-sm text-gray-500 mb-6'>Create your account</p>
    
    <form onSubmit={submitHander}>
      
        <div className=' flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-gray-400 text-gray-700'>
        <img 
        className='text-black'
        src="/person_icon.svg" alt="" />
        <input 
        onChange={(e)=>setName(e.target.value)}
        value={name}
        className='bg-transparent outline-none '
        type="text" placeholder='Name' required />
      </div>
      
    
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

    <p 
    onClick={()=>navigate('/reset-password')}
    className='mb-3 text-blue-500 underline cursor-pointer'>Forgot password ?</p>

    
    <button className='w-full bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-3'>Sign Up</button>

     {/* <button
    className='w-full bg-white text-black font-medium rounded-full border border-gray-400  p-2 mb-4'>
          <GoogleLogIn/>
    </button> */}
    
    </form>

    <p className='text-gray-600 text-center text-sm  mt-4 mb-3'> Already have an account? 
        <span 
        onClick={()=>navigate('/login')}
        className='text-blue-500 cursor-pointer underline'>Login here</span>
        </p>
   
    </div>
  </div>
)
};
