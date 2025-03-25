import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import asset from '../../assets/assets';
import { Appcontent } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Headers = () => {

  const {backendurl,profile,setProfile,setisLoggedin} = useContext(Appcontent)
  
  const navigate = useNavigate();
  
   const getUserData = async () => {
      try {
        const res = await axios.get( backendurl + '/api/user/profile',{withCredentials:true})
        return res.data.user;
      } catch (err) {
        toast.error('Get profile error', err);
        return null;
      }
    };

    useEffect(() => {
      const fetchProfile = async () => {
        const profileData = await getUserData();
        if(!profileData){
          navigate('login')
        }else{
          setProfile(profileData)
        }
      }
      fetchProfile();
    }, []);  
    
   

    const logout = async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post( backendurl + '/api/user/logout');

       data.success && setProfile(false);
       data.success && setisLoggedin(false);
       navigate("/")
      } catch (error) {
        toast.error(error);
      }
    }

  
  return (
    <div className='flex justify-between items-center px-4 py-3'>
        <div>
          <h1 className='text-sm'>Welcome Back</h1>
          <div className='flex items-center space-x-3'>
          <p className='text-xl font-semibold'>{profile.name} </p>
          <img className='w-6 h-6 aspect-square' src={asset.wave} alt="" />
          </div>
        </div>

        <div className='bg-blue-600 text-white rounded-full w-10 h-10 md:w-14 md:h-14 
        flex items-center justify-center text-2xl font-bold relative group'>
              {profile?.name.charAt(0).toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 pt-15  text-black'>
                <ul className='list-none text-sm text-center  bg-gray-100 rounded-md m-0 p-2'>
                  <li 
                  className='cursor-pointer px-2 py-1 pr-10 rounded-sm hover:bg-gray-300'
                  onClick={logout}
                  >Logout</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
