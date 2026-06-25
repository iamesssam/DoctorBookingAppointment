import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

    const { getAllAppointments,
        appointments, token, cancelAppointment } = useContext(AdminContext);

    const { calcAge } = useContext(AppContext);

    useEffect(() => {
        if (token) {
            getAllAppointments();
        }
    }, [token]);

    console.log(appointments);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>


            <div className='bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll 
            shadow-xl
            '>

                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] 
                grid-flow-col py-3 px-6 border-b
                '>

                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {appointments.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-2 
                    sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
                    items-center text-gray-500 py-3 px-6 border-b border-b-gray-200 hover:bg-gray-50'>
                        <p className='max-md:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img src={item.userData.image} alt="" className='w-12 rounded-full' />
                            <p>{item.userData.name}</p>
                        </div>
                        <p className='max-sm:hidden'>{calcAge(item.userData.dob)}</p>
                        <p>{item.slotDate} , {item.slotTime}</p>

                        <div className='flex items-center gap-2'>
                            <img src={item.docData.image} alt="" className='w-12 rounded-full bg-gray-200' />
                            <p>{item.docData.name}</p>
                        </div>
                        <p>${item.amount}</p>
                        {
                            item.cancelled ?
                                <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                                :
                                <img src={assets.cancel_icon} alt="" className='cursor-pointer'
                                    onClick={() => cancelAppointment(item._id)}
                                />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllAppointments
