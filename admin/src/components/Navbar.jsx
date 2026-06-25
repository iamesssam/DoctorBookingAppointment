import React from 'react'

// import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import navImg from "../assets/admin_logo.svg";


const Navbar = () => {

    const { token, setToken } = useContext(AdminContext);

    const logout = () => {
        token && setToken("");
        token && localStorage.removeItem('token');
    }


    return (
        <div className='bg-white py-3 px-4 sm:px-10 flex justify-between items-center border-b
        border-b-gray-300
        '>

            <div className='flex items-center gap-2 text-xs'>
                <img src={navImg} alt="" className='w-36 sm:w-40 cursor-pointer' />
                <p className='border border-gray-300 
                px-3 py-1 rounded-full text-sm text-gray-600
                '>{token ? "Admin" : "Doctor"}</p>
            </div>

            <button
                onClick={logout}
                className='px-12 py-3 rounded-full bg-[#5f6FFF] text-white cursor-pointer'>Logout</button>
        </div>
    )
}

export default Navbar




