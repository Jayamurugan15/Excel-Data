import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Appcontent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export const ResetPassword = () => {

  const navigate = useNavigate()

  const { backendurl} = useContext(Appcontent)

  const [email,setEmail] = useState("");
  const [newpassword, setNewpassword] = useState('');
  const [isemailsend,setisEmailsend] = useState();
  const [otp,setOtp] = useState('');
  const [isotpSubmited,setisotpSubmited] = useState(false)
  
  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post( backendurl + '/api/user/send-resetotp',{email});
      if(data.success){
        setisEmailsend(true);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post( backendurl + '/api/user/verify-reset-otp',{otp,email});
      if(data.success){
        setisotpSubmited(true);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handlePassword = async(e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post( backendurl +  '/api/user/reset-password',{email,otp,newpassword});
      if(data.success){
        toast.success(data.message);
        navigate('/login')
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  return (
    <div className='flex justify-center items-center bg-blue-200 h-screen'>
    
    { !isemailsend &&
        <div className='flex flex-col items-center justify-center  bg-white border rounded-lg shadow-xl  w-96  text-indigo-300 text-sm'>
        <h1 className='text-2xl mt-3  text-center text-indigo-700 mb-3'>Reset Password</h1>
        <p className='text-center text-sm text-gray-500 mb-4'>Enter your register Email address</p>
      
          <div className=' flex items-center mb-4 gap-3 px-5 py-2.5 rounded-full bg-gray-400 text-gray-700  '>
             <img 
              className='text-black'
              src="/mail_icon.svg" alt="" />
              <input 
               onChange={(e)=>setEmail(e.target.value)}
               value={email}
               className='bg-transparent outline-none '
               type="email" placeholder='Email' required />
          </div>

           <button onClick={handleEmail} className='w-60 bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-5'>Submit</button>
      
        </div>}


   {isemailsend && !isotpSubmited &&
         <div 
           className='flex flex-col items-center justify-center  bg-white border rounded-lg shadow-xl  w-96  text-indigo-300 text-sm'>
             <h1 className='text-2xl text-indigo-700 text-center mb-2'>Reset password OTP</h1>
             <p className='text-sm  text-center mb-4 text-gray-500'>Enter 6-digit OTP </p>
       
         <div className='mb-5'>
           <input type="text" 
           value={otp}
           maxLength={6} 
           required 
           onChange={(e)=>setOtp(e.target.value)}
           className='bg-gray-400 w-ful h-8 text-center text-xl text-black rounded-md'/>

         </div>

         <button onClick={handleOtp} className='w-60 bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-5'>Submit</button>
  
         
         </div>}

        {isemailsend && isotpSubmited &&
             <div className='flex flex-col items-center justify-center  bg-white border rounded-lg shadow-xl  w-100  text-indigo-300 text-sm'>
               <h1 className='text-2xl text-indigo-700 text-center mb-2'>New Password</h1>
               <p className='text-sm  text-center mb-4 text-gray-500'>Enter new password below </p>

             <div className=' flex items-center mb-4 gap-3 w-60 px-5 py-2.5 rounded-full bg-gray-400 text-gray-700 '>
                <img src="/lock_icon.svg" alt="" />
                <input 
                  onChange={(e)=>setNewpassword(e.target.value)}
                  value={newpassword}
                  className='bg-transparent outline-none '
                  type="password" placeholder=' Enter new password' required/>
             </div>
             <button onClick={handlePassword} className='w-60 bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-5'>Submit</button>
             </div>}
    </div>
  )
}

