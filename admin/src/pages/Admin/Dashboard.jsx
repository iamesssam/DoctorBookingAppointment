import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { assets } from "../../assets/assets"
const Dashboard = () => {

    const { getDashData,
        dashData, token, cancelAppointment } = useContext(AdminContext);

    useEffect(() => {
        if (token) {
            getDashData();
        }
    }, [token])


    return dashData && (
        <div className='m-5'>

            <div className='flex flex-wrap gap-8'>

                {/* Data side */}

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 
                cursor-pointer hover:scale-105 transition-all duration-500
                '>
                    <img src={assets.doctor_icon} alt="" className='w-14' />
                    <div>
                        <p className='text-xl font-medium'>{dashData.doctors}</p>
                        <p>Doctors</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 
                cursor-pointer hover:scale-105 transition-all duration-500
                '>
                    <img src={assets.appointments_icon} alt="" className='w-14' />
                    <div>
                        <p className='text-xl font-medium'>{dashData?.latestAppointments?.length}</p>
                        <p>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 
                cursor-pointer hover:scale-105 transition-all duration-500
                '>
                    <img src={assets.patients_icon} alt="" className='w-14' />
                    <div>
                        <p className='text-xl font-medium'>{dashData.users}</p>
                        <p>Patients</p>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200'>
                    <img src={assets.list_icon} alt="" />
                    <p className='font-semibold'>Latest bookings</p>
                </div>
                <div className='pt-4 border border-gray-200 border-t-0'>
                    {
                        dashData.latestAppointments.map((item, index) => (
                            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                                <img src={item.docData.image} alt="" className='rounded-full w-10' />
                                <div className='flex-1'>
                                    <p>{item.docData.name}</p>
                                    <p>{item?.slotDate}</p>
                                </div>

                                {
                                    item.cancelled ?
                                        <p className='text-red-400 font-medium'>Cancelled</p>
                                        :
                                        <img src={assets.cancel_icon} alt=""
                                            className='cursor-pointer'
                                            onClick={() => cancelAppointment(item._id)}
                                        />
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Dashboard
