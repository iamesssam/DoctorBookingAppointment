import React, { useContext, useState } from 'react'

import profile from "../assets/upload_area.png";
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { toast } from "sonner";

const MyProfile = () => {


    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const { userData, setUserData, userProfileData, token
    } = useContext(AppContext);

    const updateProfileData = async () => {

        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);

            image && formData.append("image", image);

            const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/user/updateProfile",
                formData,
                { headers: { "token": token } }
            );

            if (data.success) {
                toast.success(data.message);
                await userProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }



    return userData && (

        <div className='px-5 md:px-0 max-w-lg flex flex-col gap-2 pt-5'>
            {/* صورة البروفايل */}
            <div className='mt-10'>
                {
                    isEdit ?
                        <label htmlFor="image">
                            <div className='inline-block relative cursor-pointer'>
                                <input type="file" id="image" hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <img src={image ? URL.createObjectURL(image) : userData.image} alt="" className='w-36 rounded opacity-75' />
                            </div>
                        </label>
                        :
                        <div className=''>
                            <img src={userData.image} alt="" className='w-36 rounded shadow-sm' />
                        </div>
                }
            </div>

            {/* الاسم */}
            {
                isEdit ?
                    <div>
                        <input type="text"
                            value={userData.name}
                            onChange={e =>
                                setUserData(prev => ({ ...prev, name: e.target.value }))}
                            className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 outline-none p-1 rounded' />
                    </div>
                    :
                    <div className='mt-5'>
                        <h2 className='text-3xl font-medium text-neutral-800 mt-4'>
                            {userData.name}</h2>
                    </div>
            }
            <hr className='bg-zinc-400 h-[1px] border-none w-full mt-5' />

            {/* معلومات الاتصال - CONTACT INFORMATION */}
            <div>
                <p className='uppercase text-neutral-500 underline mt-3 font-semibold'>CONTACT INFORMATION</p>

                {/* هنا السحر: الـ Grid اللي هيثبت العناوين والداتا جنب بعض بالمسطرة */}
                <div className='grid grid-cols-[1fr_3fr] gap-y-3.5 mt-4 text-neutral-700 items-center'>

                    {/* Email */}
                    <p className='font-medium text-lg text-gray-900'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>

                    {/* Phone */}
                    <p className='font-medium text-lg text-gray-900'>Phone:</p>
                    {
                        isEdit ?
                            <input type="text" className='bg-gray-100 max-w-52 outline-none px-3 py-1 rounded'
                                value={userData.phone}
                                onChange={(e) =>
                                    setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                            :
                            <p className='text-blue-400 font-medium'>{userData.phone}</p>
                    }

                    {/* Address */}
                    <p className='font-medium text-lg text-gray-900 self-start mt-1'>Address:</p>
                    {
                        isEdit ?
                            <div className='flex flex-col gap-2'>

                                <input type="text" className='bg-gray-100 outline-none px-3 py-1 rounded w-full'
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line1: e.target.value }
                                    }))}
                                    value={userData.address.line1}
                                />
                                <input type="text" className='bg-gray-100 outline-none px-3 py-1 rounded w-full'
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line2: e.target.value }
                                    }))}
                                    value={userData.address.line2}
                                />
                            </div>
                            :
                            <div className='text-gray-500 font-medium'>
                                <p>{userData.address.line1}</p>
                                <p>{userData.address.line2}</p>
                            </div>
                    }
                </div>
            </div>

            <hr className='bg-zinc-400 h-[1px] border-none w-full mt-5' />

            {/* المعلومات الأساسية - BASIC INFORMATION */}
            <div>
                <p className='uppercase text-neutral-500 underline mt-3 font-semibold'>BASIC INFORMATION</p>

                {/* نفس الـ Grid عشان الهيدنج والكلام ميبوظوش في الشاشات الكبيرة */}
                <div className='grid grid-cols-[1fr_3fr] gap-y-3.5 mt-4 text-neutral-700 items-center'>

                    {/* Gender */}
                    <p className='font-medium text-lg text-gray-900'>Gender:</p>
                    {
                        isEdit ?
                            <select
                                className='max-w-24 bg-gray-100 outline-none p-1 rounded cursor-pointer'
                                onChange={(e) =>
                                    setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                value={userData.gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            :
                            <p className='text-gray-400 font-medium'>Male</p>
                    }

                    {/* Birthday */}
                    <p className='font-medium text-lg text-gray-900'>Birthday:</p>
                    {
                        isEdit ?
                            <input type="date"
                                className='max-w-36 bg-gray-100 outline-none px-3 py-1 rounded'
                                value={userData.dob}
                                onChange={(e) =>
                                    setUserData(prev => ({ ...prev, dob: e.target.value }))}
                            />
                            :
                            <p className='text-gray-400 font-medium'>{userData.dob}</p>
                    }
                </div>
            </div>


            <div className='mt-15'>
                {
                    isEdit ?
                        <button className='border border-[#5f6FFF] px-12 py-2 rounded-full cursor-pointer text-lg hover:bg-[#5f6FFF] hover:text-white transition-all duration-300'
                            onClick={() => updateProfileData()}
                        >
                            Save information
                        </button>
                        :
                        <button className='border border-[#5f6FFF] px-12 py-2 rounded-full cursor-pointer text-lg hover:bg-[#5f6FFF] hover:text-white transition-all duration-300'
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                }
            </div>

        </div>

    )
}

export default MyProfile




