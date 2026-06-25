import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';

import home from "../assets/home_icon.svg";
import appointment from "../assets/appointment_icon.svg";
import add from "../assets/add_icon.svg";
import people from "../assets/people_icon.svg";
import { DoctorContext } from '../context/DoctorContext';
const Sidebar = () => {
    const { token } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className='min-h-screen bg-white border-r border-r-gray-200'>
            {
                token && <ul>
                    <NavLink to="/dashboard"
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 
                        md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                         mb-3`}>
                        <img src={home} alt="" />
                        <p className='hidden md:block'>
                            Dashboard
                        </p>
                    </NavLink>

                    <NavLink to="/allAppointments"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-72 cursor-pointer 
                            ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                             mb-3`}>
                        <img src={appointment} alt="" />
                        <p className='hidden md:block'>
                            Appointments
                        </p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-72 cursor-pointer 
                            ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                             mb-3`}
                        to="/addDoctor">
                        <img src={add} alt="" />
                        <p className='hidden md:block'>
                            Add Doctor
                        </p>
                    </NavLink>

                    <NavLink to="/doctorList"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-72 cursor-pointer 
                            ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                            mb-7
                            `}
                    >
                        <img src={people} alt="" />
                        <p className='hidden md:block'>
                            Doctors List
                        </p>
                    </NavLink>
                </ul>
            }



            {
                dToken && <ul>
                    <NavLink to="/doctorDashboard"
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 
                        md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                         mb-3`}>
                        <img src={home} alt="" />
                        <p className='hidden md:block'>
                            Dashboard
                        </p>
                    </NavLink>

                    <NavLink to="/doctorAppointment"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-72 cursor-pointer 
                            ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                             mb-3`}>
                        <img src={appointment} alt="" />
                        <p className='hidden md:block'>
                            Appointments
                        </p>
                    </NavLink>



                    <NavLink to="/doctorProfile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-72 cursor-pointer 
                            ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""}
                            mb-7
                            `}
                    >
                        <img src={people} alt="" />
                        <p className='hidden md:block'>
                            Profile
                        </p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
