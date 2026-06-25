import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { doctors } from '../assets/assets';
import axios from "axios"

import verified from "../assets/verified_icon.svg";
import info from "../assets/info_icon.svg";
import RelatedDoctors from '../components/RelatedDoctors';
import { AppContext } from '../context/AppContext';
import { toast } from "sonner";

const Appointment = () => {
    const { docId } = useParams();
    const [doctorInfo, setDoctorInfo] = useState(null);

    const { doctors, token, getDoctorsData } = useContext(AppContext);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const navigate = useNavigate();

    const [doctorSlots, setDoctorSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');


    const fetchDoctorInfo = () => {
        const doctor = doctors.find(doc => doc._id === docId);
        setDoctorInfo(doctor);
    }



    const getAvailableSlots = async () => {
        if (!doctorInfo) return;

        let allSlots = [];

        //getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            //getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            //setting end time of the data with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ?
                    currentDate.getHours() + 1 : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }


            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedDate = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTimeStr = formattedDate;

                //check if the aapointment is already booked
                const isSlotAvailable = doctorInfo.slots_booked?.[slotDate] &&
                    doctorInfo.slots_booked[slotDate].includes(slotTimeStr) ? false : true;

                if (isSlotAvailable) {
                    //add slot to array 
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedDate
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            allSlots.push(timeSlots);
        }
        setDoctorSlots(allSlots);
    }


    const bookAppointment = async () => {

        if (!token) {
            toast.warning("Login to book appointment");
            return navigate("/login");
        }

        try {

            const date = doctorSlots[slotIndex][0].dateTime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();


            const slotDate = day + "_" + month + "_" + year;

            const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/user/bookAppointment",
                {
                    docId, slotDate, slotTime,
                },
                {
                    headers: { "token": token }
                }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate("/myAppointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }




    useEffect(() => {
        fetchDoctorInfo();
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots();
    }, [doctorInfo]);


    console.log(doctorInfo);


    return doctorInfo ? (
        <div>
            <div className='flex flex-col sm:flex-row gap-5'>

                <div className=''>
                    <img src={doctorInfo?.image} alt="" className='
                     w-full sm:max-w-90  bg-[#5f6FFF] rounded-xl' />
                </div>

                <div className='flex-1 border border-gray-300/70 rounded-xl px-8 py-8
                mx-2 sm:mx-0 mt-[-80px] md:mt-0 bg-white
                '>
                    <div className='flex items-center gap-2'>
                        <h2 className='text-2xl md:text-4xl'>{doctorInfo?.name}</h2>
                        <img src={verified} alt="" />
                    </div>

                    <div className='mt-3'>
                        <p className=' md:text-lg text-gray-600 font-medium'>{doctorInfo?.degree} - {doctorInfo?.speciality}
                            <span className='ml-3 text-sm border border-gray-300 rounded-xl 
                            px-2 py-1 md:px-3 md:py-1 cursor-pointer
                            '>
                                {doctorInfo?.experience}</span>
                        </p>
                    </div>

                    <div className='flex gap-2 mt-4'>
                        <h3 className='font-medium md:text-lg'>About</h3>
                        <img src={info} alt="" />
                    </div>

                    <div>
                        <p className='text-sm md:text-lg text-gray-600'>Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine,
                            <br />
                            early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering
                            <br />
                            comprehensive medical care, focusing on preventive medicine,
                            early diagnosis, and effective treatment <br /> strategies.
                        </p>
                    </div>

                    <div className='mt-7'>
                        <p className='text-xl font-medium text-gray-600'>Appointment fee

                            : <span className='text-black'>${doctorInfo?.fees}</span>
                        </p>
                    </div>
                </div>
            </div>


            {/* Doctor Slots */}

            <div className='sm:ml-72 sm:pl-30 mt-4 font-medium text-gray-700'>
                <p className='text-xl'>Booking slots</p>

                <div className='flex items-center w-full gap-3 mt-4 overflow-x-scroll '>
                    {doctors.length > 0 && doctorSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
                                ${slotIndex === index ? "bg-[#5f6FFF] text-white" :
                                    "border border-gray-200"}
                                `}
                        >
                            <p>{item[0] && weekDays[item[0].dateTime.getDay()]}</p>
                            <p>{item[0] && item[0].dateTime.getDate()}</p>
                        </div>
                    ))}
                </div>


                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {doctorSlots.length > 0 && doctorSlots[slotIndex]?.map((item, index) => (
                        <p key={index} onClick={() => setSlotTime(item.time)}
                            className={`text-sm px-5 py-3 flex-shrink-0 rounded-full cursor-pointer 
                                ${item.time === slotTime ? "bg-[#5f6FFF] text-white" :
                                    "border border-gray-200"} 
                                `}
                        >
                            {item.time}
                        </p>
                    ))}
                </div>

                <button
                    className='px-14 py-3 bg-[#5f6FFF] text-white rounded-full my-6 cursor-pointer'

                    onClick={bookAppointment}
                >Book an appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={doctorInfo?.speciality} />

        </div>
    ) : (
        <div className='flex justify-center items-center h-screen'>
            <p>Loading Doctor Details...</p>
        </div>
    )
}

export default Appointment
