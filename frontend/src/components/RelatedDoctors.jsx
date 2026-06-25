import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
// import { doctors } from '../assets/assets'

const RelatedDoctors = ({ docId, speciality }) => {

    const [relatedDoctors, setRelatedDoctors] = useState([]);

    const { doctors } = useContext(AppContext);
    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorss = doctors?.filter((doc) => doc.speciality === speciality
                && doc._id !== docId
            );
            setRelatedDoctors(doctorss);
        }

    }, [doctors, speciality, docId])


    const navigate = useNavigate();
    return (
        <div className='py-16 flex flex-col items-center my-16'>
            <h1 className='text-3xl font-bold'>Top Doctors to Book</h1>
            <p className='text-gray-500 text-sm md:text-xl mt-3  text-center sm:w-1/3'>Simply browse through our extensive list of trusted doctors</p>
            <div className='w-full grid grid-cols-1 md:grid-cols-5 px-3 pt-10 gap-6'>
                {relatedDoctors.slice(0, 4).map((doc, index) => (
                    <Link to={`/appointment/${doc._id}`}
                        className='cursor-pointer border border-[#eaefff] rounded-xl
                hover:translate-y-[-10px] transition-all duration-300
                '
                        key={index}

                    >
                        <div className='bg-[#eaefff]'>
                            <img src={doc.image} alt="" />
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

            <button className='cursor-pointer text-gray-600 px-12 py-3 bg-blue-50 rounded-full mt-10'
                onClick={() => {
                    navigate("/doctors")
                }}
            >more</button>
        </div>
    )
}

export default RelatedDoctors
