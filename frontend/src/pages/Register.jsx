import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from "axios";

import { toast } from "sonner";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/api/user/register",
                { name, email, password }
            );

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token])


    return (
        <form onSubmit={onSubmitHandler}>
            <div className='w-full max-w-full sm:max-w-[500px] bg-white shadow-lg
            px-10 m-auto mt-20 py-10 rounded-xl border border-gray-500/20
            '>
                <h2 className='text-gray-600 font-semibold text-2xl'>Create Account</h2>
                <p className='text-gray-600 mt-3 mb-3 text-sm md:text-lg'>Please sign up to book appointment</p>

                {/* User Name Field */}
                <div>
                    <label className='text-sm md:text-lg text-gray-700'>Full Name</label>
                    <input type="text" className='w-full py-2 px-3 border mt-2
                     border-gray-300 rounded-lg outline-none'
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>


                {/* User Email Field */}
                <div className='mt-5'>
                    <label className='text-sm md:text-lg text-gray-700'>Email</label>
                    <input type="email" className='w-full py-2 px-3 border mt-2
                     border-gray-300 rounded-lg outline-none'
                        placeholder='Example@icloud.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* User Password Field */}
                <div className='mt-5'>
                    <label className='text-sm md:text-lg text-gray-700'>Password</label>
                    <input type="password" className='w-full py-2 px-3 border mt-2
                     border-gray-300 rounded-lg outline-none'
                        placeholder='**********************'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='mt-5'>
                    <button className='w-full py-2 px-3 bg-[#5f6FFF] text-white 
                    rounded-lg text-lg md:text-xl cursor-pointer'>
                        Create account</button>

                    <p className='text-sm md:text-lg text-gray-600 mt-8'>Already have an account ?
                        <Link className='text-[#5f6FFF] hover:underline 
                        ml-1'
                            to="/login"
                        >Login here</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Register 
