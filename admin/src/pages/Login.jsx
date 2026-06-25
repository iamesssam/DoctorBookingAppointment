import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'sonner';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken } = useContext(AdminContext);

    const { setDToken } = useContext(DoctorContext);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === "Admin") {
                const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/admin/login",
                    {
                        email, password
                    })

                if (data.success) {

                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success("welcom")
                } else {
                    // toast.error("error");
                }

            } else {
                try {
                    const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/doctor/doctorLogin",
                        {
                            email, password
                        }
                    );

                    if (data.success) {
                        localStorage.setItem('dToken', data.token);
                        setDToken(data.token);
                        console.log(data.token);

                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        } catch (error) {
            toast.error("error");

        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 
            border border-gray-300 rounded-xl text-[#5E5E5E] text-sm shadow-lg
            '>
                <p className='text-2xl font-semibold m-auto'><span className='text-[#5f6FFF]'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" required className='border border-[#DADADA] rounded 
                    w-full p-2 mt-1 outline-none
                    '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" required className='border border-[#DADADA] rounded 
                    w-full p-2 mt-1 outline-none
                    '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base
                cursor-pointer
                '>Login</button>

                {
                    state === "Admin" ?
                        <p className='text-xl'>Doctor Login ? <span onClick={() => setState("Doctor")}
                            className='text-[#5f6FFF] cursor-pointer'
                        >Click here</span></p>
                        :
                        <p className='text-xl'>Admin Login ? <span onClick={() => setState("Admin")}
                            className='text-[#5f6FFF] cursor-pointer'
                        >Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
