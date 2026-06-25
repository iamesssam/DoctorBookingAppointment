import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {

    const { dToken, appointments, listAppointments
        , completeAppointment,
        cancelAppointment
    } = useContext(DoctorContext);

    console.log(appointments);


    const { calcAge } = useContext(AppContext);
    useEffect(() => {

        if (dToken) {
            listAppointments();
        }
    }, [dToken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white border border-gray-200 shadow-xl border-gray-200 rounded max-h-[80vh]
            min-h-[50vh] overflow-y-scroll
            '>

                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] 
                gap-1 py-3 px-6 border-b
                '>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {
                    appointments.reverse().map((item, index) => (
                        <div key={index} className='flex flex-wrap justify-between 
                        max-sm:gap-5 max-sm:text-base sm:grid
                        grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center 
                        py-3 px-6 border-b border-b-gray-200 hover:bg-gray-50 cursor-pointer
                        '>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img src={item.userData.image} alt="" className='w-12 rounded-full' /> <p>
                                    {item.userData.name}
                                </p>
                            </div>

                            <div >
                                <p className='inline border border-gray-200 
                                 px-2 rounded-full
                                '>{item.payment ? 'Online' : 'CASH'}</p>
                            </div>
                            <p className='max-sm:hidden'>{calcAge(item.userData.dob)}</p>
                            <p>{item.slotDate} , {item.slotTime}</p>
                            <p>${item.amount}</p>
                            {
                                item.cancelled
                                    ? <p className='text-red-400 font-medium'>Cancelled</p>
                                    : item.isCompleted
                                        ? <p className='text-green-500 font-medium'>Completed</p>
                                        : <div className='flex'>
                                            <img src={assets.cancel_icon} alt="" className='cursor-pointer'
                                                onClick={() => cancelAppointment(item._id)}
                                            />
                                            <img src={assets.tick_icon} alt="" className='cursor-pointer'
                                                onClick={() => completeAppointment(item._id)}
                                            />
                                        </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointment
