import React, { useContext } from 'react'
// import { doctors } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const { doctors } = useContext(AppContext);

    console.log(doctors);

    const navigate = useNavigate();
    return (
        <div className='py-16 flex flex-col items-center'>
            <div className='text-center'>
                <h2 className='font-semibold text-3xl md:text-4xl text-center'>Top Doctors to Book</h2>
                <p className='mt-5 text-sm md:text-lg '>
                    Simply browse through our extensive list of trusted doctors.</p>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-5 px-3 pt-10 gap-6'>
                {doctors.slice(0, 10).map((doc, index) => (
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
            <div className='text-center mt-20'>
                <button className='px-15 py-4 bg-[#eaefff] rounded-full
                text-xl cursor-pointer
                '
                    to="/doctors"
                    onClick={() => {
                        navigate("/doctors");
                        scrollTo(0, 0)
                    }
                    }
                >more</button>
            </div>
        </div>
    )
}

export default TopDoctors
