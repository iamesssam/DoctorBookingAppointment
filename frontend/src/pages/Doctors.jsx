import React, { useContext, useEffect, useState } from 'react'
// import { doctors, specialityData } from '../assets/assets'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useConnection } from '../../../backend/models/Doctor';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
    const { specialty } = useParams();

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [filtered, setFiltered] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const applyFilters = () => {

        if (specialty) {
            setFiltered(doctors.filter(doctor => doctor.speciality === specialty));
        } else {
            setFiltered(doctors);
        }
    }

    useEffect(() => {
        applyFilters();
    }, [doctors, specialty])


    // const [speciality, setSpeciality] = useState("");
    return (
        <div>
            <p className='mb-8 text-md md:text-xl text-gray-700'>Browse through the doctors specialist.</p>
            <button className={`block md:hidden px-6 py-1 border border-gray-300 rounded mb-7
            ${isOpen ? "bg-[#5f6FFF] text-white" : ""}
            `}
                onClick={() => setIsOpen(!isOpen)}
            >
                Filters</button>

            <div className='flex flex-col md:flex-row items-start gap-8'>
                {/* Left side  */}
                <div className='w-full md:w-[20%]'>
                    <p className={`border border-gray-300 px-4 py-2 mb-5 rounded cursor-pointer
                    text-gray-700 ${isOpen ? "block" : "hidden"} md:block
                    ${specialty
                            === "General physician" ? "bg-[#eaefff] font-semibold" : ""} 
                    `}
                        onClick={() =>
                            specialty === "General physician" ?
                                navigate("/doctors") :
                                navigate("/doctors/General physician")
                        }
                    >
                        General physician</p>
                    <p className={`border border-gray-300 px-4 py-2 mb-5 rounded cursor-pointer text-gray-700
                    ${isOpen ? "block" : "hidden"} md:block
                    ${specialty === "Gynecologist" ? "bg-[#eaefff] font-semibold" : ""}
                    `}
                        onClick={() =>
                            specialty === "Gynecologist" ? navigate("/doctors") :
                                navigate("/doctors/Gynecologist")
                        }
                    >
                        Gynecologist</p>
                    <p className={`border border-gray-300  px-4 py-2 mb-5 rounded cursor-pointer text-gray-700 
                    ${isOpen ? "block" : "hidden"} md:block
                    ${specialty === "Dermatologist" ? "bg-[#eaefff] font-semibold" : ""}
                    
                    `}
                        onClick={() =>
                            specialty === "Dermatologist" ?
                                navigate("/doctors") : navigate("/doctors/Dermatologist")
                        }
                    >
                        Dermatologist</p>
                    <p className={`border border-gray-300  px-4 py-2 mb-5 rounded cursor-pointer text-gray-700
                    ${isOpen ? "block" : "hidden"} md:block
                    ${specialty === "Pediatricians" ? "bg-[#eaefff] font-semibold" : ""}
                    `}
                        onClick={() => specialty === "Pediatricians" ?
                            navigate("/doctors") : navigate("/doctors/Pediatricians")
                        }
                    >
                        Pediatricians</p>
                    <p className={`border border-gray-300  px-4 py-2 mb-5 rounded cursor-pointer text-gray-700
                        ${isOpen ? "block" : "hidden"} md:block
                    ${specialty === "Neurologist" ? "bg-[#eaefff] font-semibold" : ""}
                    `}
                        onClick={() => specialty === "Neurologist" ?
                            navigate("/doctors") : navigate("/doctors/Neurologist")
                        }
                    >
                        Neurologist</p>
                    <p className={`border border-gray-300  px-4 py-2 mb-5 rounded cursor-pointer text-gray-700
                    ${specialty === "Gastroenterologist" ? "bg-[#eaefff] font-semibold" : ""}
                                        ${isOpen ? "block" : "hidden"} md:block

                    `}
                        onClick={() => specialty === "Gastroenterologist" ?
                            navigate("/doctors") : navigate("/doctors/Gastroenterologist")
                        }
                    >
                        Gastroenterologist</p>
                </div>




                {/* Right side */}
                <div className='grid grid-cols-1 md:grid-cols-4 px-3 gap-6 rounded-xl'>
                    {filtered.map((doc, index) => (
                        <Link key={index} to={`/appointment/${doc._id}`}
                            className='cursor-pointer border border-[#eaefff] rounded-xl
                        hover:translate-y-[-10px] transition-all duration-300
                        '
                        >
                            <div className='bg-[#eaefff]'>
                                <img src={doc.image} alt="" className='' />
                            </div>

                            <div className='px-5'>
                                <div className='flex items-center gap-1'>
                                    <div className='bg-green-500 w-2.5 h-2.5 rounded-full
                                relative top-1.5'></div>
                                    <p className='text-green-700 font-medium mt-3'>Available</p>
                                </div>
                                <p className='text-xl font-medium mt-1'>{doc.name}</p>
                                <p className='text-lg font-medium text-gray-600 mb-5'>
                                    {doc.speciality}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Doctors
