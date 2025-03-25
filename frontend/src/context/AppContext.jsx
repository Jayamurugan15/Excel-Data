import { createContext , useEffect, useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


export const Appcontent = createContext();

export const AppcontextProvider = (props) => {

const backendurl = import.meta.env.VITE_BACKEND_URL
const [isLoggedin, setisLoggedin] = useState(false);
const [userData, setUserData] = useState(null);

const [profile, setProfile] = useState(
  {
    name:"",
    email:"",
  }
  );


const getUserData = async () => {
    try {
      const res = await axios.get( backendurl + '/api/user/profile',{withCredentials:true})
      return res.data.user;
    } catch (err) {
      toast.error('Get profile error', err);
      return null;
    }
  };

const value = {
  backendurl,
  isLoggedin, setisLoggedin,
  userData, setUserData,
  getUserData,
  profile, setProfile
}

return(
    <Appcontent.Provider value={value}>
        {props.children}
    </Appcontent.Provider>
)
}

