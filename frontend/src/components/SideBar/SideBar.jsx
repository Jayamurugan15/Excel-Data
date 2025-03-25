import axios from 'axios';
import React, { useContext, useState } from 'react'


import { FaUser } from 'react-icons/fa'
import { MdOutlineEmail, MdSettings } from "react-icons/md";
import { RiLockPasswordFill, RiLogoutCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { Appcontent } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../FileUpload.jsx';

export const SideBar = () => {

    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState();

    const handleLink = (index) => {
        setActiveLink(index)
    }

    const { backendurl, SetUserData, setisLoggedin } = useContext(Appcontent);


    const SIDEBAR_LINKS = [
        { id: 1, name: "Profile", path: "/dashboard", icon: FaUser },
        { id: 2, name: "Get it Visualized", path: "/dashboard/visual", icon: MdOutlineEmail },
    ]

    const logout = async () => {
        const { data } = await axios.post(backendurl + '/api/user/logout', { withCredentials: true });

        if (data.success) {
            setisLoggedin(true);
            SetUserData('');
            navigate('/')
        }
    }

    return (
        <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r border-amber-50 pt-8  px-4 bg-white'>
            <div className='mb-8'>
                <h2 className='text-2xl font-semibold  hidden md:block'>Dashboard</h2>
            </div>

            <div className='flex flex-col justify-between items-center'>
                <ul className='mt-6 space-y-4 text-gray-700'>

                    {
                        SIDEBAR_LINKS.map((link, index) => (
                            <li key={index}
                                className={`font-medium rounded-md py-2 px-5 hover:bg-gray-200 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-200 text-indigo-500" : ""}`}>
                                <Link
                                    to={link.path}
                                    onClick={() => handleLink(index)}
                                    className='flex justify-center items-center md:space-x-5'
                                >
                                    <span className='text-sm hidden md:flex'>{link.name} </span>
                                    <span> {link.icon()} </span>
                                </Link>

                            </li>
                        ))
                    }
                </ul>

                <div className='w-full absolute bottom-5 mx-auto  px-4 py-2'>
                    <button onClick={() => navigate("/")}
                        className='flex items-center gap-2   
                         rounded-lg bg-blue-600 text-white text-sm md:px-6 py-2 px-5  
                         hover:bg-blue-700 transition-all'>
                        <span className='hidden md:block'>
                            Logout
                        </span> <RiLogoutCircleLine />
                    </button>
                </div>
            </div>
        </div>
    )
}
