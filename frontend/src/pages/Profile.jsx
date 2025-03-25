import { useEffect, useContext } from 'react'
import { Appcontent } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


export const Profile = () => {

  const navigate = useNavigate()

  const {getUserData,profile, setProfile,setisLoggedin,backendurl} = useContext(Appcontent);

  useEffect( () => {
    const fetchProfile = async () => {
      const profileData = await getUserData();
      if(!profileData){
        navigate('/login')
      }else{
        setProfile(profileData)
      }
    }
    fetchProfile();
  },[]);  

  const sendVerifyOtp = async () => {
    try {
      const {data} = await axios.post( backendurl +'/api/user/sendotp',{},{withCredentials:true});
      if(data.success){
        navigate('/dashboard/Email-verify');
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


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
  <div className='flex justify-center items-center h-[90vh]'>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
        <div className="flex justify-end px-4 pt-4">
          <button onClick={logout} className=" px-4 py-2 font-semibold text-sm text-red-600 rounded-lg hover:bg-gray-200">Logout</button>
        </div>
        <div className="flex flex-col items-center pb-10">
             <div className='bg-blue-600 text-white rounded-full w-18 h-18 
              flex items-center justify-center text-2xl font-bold relative group'>
              {profile?.name.charAt(0).toUpperCase()}
            </div>
             <h5 className="mb-1 text-xl font-medium text-gray-900 ">{profile.name}</h5>
             <span className="text-sm text-gray-500">{profile.email}</span>
           <div className="flex justify-center items-center mt-4 md:mt-6 space-x-3">
           
            <button 
            onClick={sendVerifyOtp}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white ${profile.isAccountVerified ? "bg-green-500" : "bg-red-500"}  rounded-lg`}>{profile.isAccountVerified ? "Verified" : "Verify Email" }
            </button>
        
          </div>
        </div>
     </div>
  </div>

  );
}
