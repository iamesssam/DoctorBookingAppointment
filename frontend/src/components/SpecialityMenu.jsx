import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='py-16' id='speciality'>
            <div className='flex flex-col items-center gap-4 text-gray-800'>
                <h2 className='font-semibold text-4xl text-center'>Find by Speciality</h2>
                <p className='text-center mt-2 font-medium text-sm md:text-base'>
                    Simply browse through our extensive list of trusted doctors,
                    <br className='hidden sm:block' />
                    schedule your appointment hassle-free.
                </p>
            </div>


            <div className='flex justify-start sm:justify-center items-center gap-6 mt-10 overflow-x-auto w-full px-6'>
                {specialityData.map((spec, index) => (
                    <Link
                        to={`/doctors/${spec.speciality}`}
                        // التعديل: scrollTo بشكل أنعم
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='flex flex-col items-center gap-4 cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                        key={index}>
                        <img src={spec.image} alt="" className='w-16 sm:w-24' />
                        <p className='font-medium text-xs sm:text-sm'>{spec.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu