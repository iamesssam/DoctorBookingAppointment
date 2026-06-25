import React from 'react'
import contactPic from "../assets/contact_image.png";


const Contact = () => {
    return (
        <div className='py-12'>
            <div className='text-center text-2xl md:text-3xl mb-10'>
                <h2 className='text-[#707070] font-medium'>CONTACT
                    <span className='text-gray-700 ml-1'>
                        US
                    </span>
                </h2>
            </div>


            <div className='flex flex-col md:flex-row justify-center gap-10 md:pr-20'>
                <div>
                    <img src={contactPic} alt="" className='w-120' />
                </div>

                <div>

                    <div className='mt-5'>
                        <h2 className='font-medium text-gray-700 text-xl md:text-2xl'>OUR OFFICE</h2>
                    </div>

                    <div className='mt-8'>
                        <p className='text-sm md:text-lg text-gray-500'>00000 Willms Station</p>
                        <p className='text-sm md:text-lg text-gray-500'>Suite 000, Washington, USA</p>
                    </div>
                    <div className='mt-8'>
                        <p className='text-sm md:text-lg text-gray-500'> Tel: (000) 000-0000</p>
                        <p className='text-sm md:text-lg text-gray-500'>Email: essamali19@icloud.com</p>
                    </div>

                    <div className='mt-8'>
                        <h2 className='font-medium text-gray-700 text-xl md:text-2xl'>CAREERS AT PRESCRIPTO</h2>
                    </div>

                    <div>
                        <p className='text-sm md:text-lg text-gray-500 mt-8'>Learn more about our teams and job openings.</p>
                        <button
                            className='border border-black py-3 px-7 md:py-4 md:px-9 mt-10 
                            cursor-pointer hover:bg-black hover:text-white transition-all duration-500
                            '
                        >Explore Jobs</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
