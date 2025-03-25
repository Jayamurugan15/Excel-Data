import axios from "axios";
import { useState, useContext } from "react"
import { Appcontent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Emailverify = () => {

  const [otp,setOtp] = useState("");
  const {backendurl, getUserData} = useContext(Appcontent);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {
      const {data}  = await axios.post( backendurl + '/api/user/verify-otp',{otp},{withCredentials:true});
      if(data.success){
      toast.success(data.message);
      getUserData();
      navigate('/dashboard');
       }else{
        toast.error(data.message);
    }
    } catch (error) {
      toast.error(error.message);
    }
 
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-[url("/bg_img.png")] bg-cover'>
        <div className='flex flex-col items-center justify-center  bg-gray-200 border border-gray-200 rounded-lg shadow-xl w-full sm:w-96 text-indigo-300 text-sm p-5'>
            <h1 className='text-2xl text-indigo-700 text-center mb-2'>Email Verification</h1>
            <p className='text-sm  text-center mb-4 text-gray-500'>Enter 6-digit OTP </p>
            <div>
             <form 
             onSubmit={handleSubmit}
             className='flex flex-col'>
             <div className='space-x-3 mb-5'>
               <input type="text" 
               name="otp" 
               value={otp}
               maxLength={6} 
               required 
               onChange={(e)=>setOtp(e.target.value)}
               className='bg-gray-400 w-full h-8 text-center text-xl text-black rounded-md'/>

             </div>

             <button type="submit" className='w-60 bg-blue-700 text-white font-medium rounded-full  py-2.5 mb-5'>Verify Email</button>
             
             </form>
            </div>
        </div>
    </div>
  )
}
