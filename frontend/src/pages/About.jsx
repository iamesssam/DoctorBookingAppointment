import React from 'react'
import aboutImg from "../assets/about_image.png"
const About = () => {
    return (
        <div className='py-12'>
            <div className='text-center text-2xl md:text-3xl mb-15'>
                <h2 className='text-[#707070] font-medium'>ABOUT
                    <span className='text-gray-700 ml-1'>
                        US
                    </span>
                </h2>
            </div>

            {/* Container dev */}
            <div className='flex flex-col md:flex-row  justify-center items-center'>
                <div className='flex justify-center'>
                    <img src={aboutImg} alt="" className='w-full md:w-[70%]' />
                </div>

                <div className='flex-1 mt-5 text-gray-700'>
                    {/* <p className=''>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and <br />
                        efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling <br />
                        doctor appointments and managing their health records.</p> */}

                    <p className='text-sm md:text-lg'>
                        <p className='mb-5'>
                            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. <br />
                        </p>

                        <p className='mb-5'>
                            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
                        </p>

                        <b>
                            Our Vision
                        </b>
                        <p className='mt-8'>

                            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                        </p>
                    </p>
                </div>
            </div>


            {/* last section */}
            <div className='flex flex-col justify-center   md:ml-27 mt-10'>
                <div>
                    <h2 className='text-xl md:text-2xl font-medium text-gray-600 mb-9'>WHY
                        <span className='ml-1 text-black'>
                            CHOOSE US
                        </span>
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 border border-gray-300 
                md:h-70  
                '>
                    {/* card 1 */}
                    <div className='px-10 md:px-15  flex justify-center flex-col py-10  md:border-r md:border-r-gray-300 text-gray-600 
                   hover:text-white  hover:bg-[#5f6FFF] hover:border-[#5f6FFF] transition-all duration-300 cursor-pointer
                    '>
                        <p className=' mt-2 text-lg md:text-2xl font-bold uppercase'>Efficiency : </p>
                        <p className='mt-5 text-sm md:text-lg font-medium'>
                            Streamlined appointment scheduling
                            <br />
                            that fits into your busy lifestyle.
                        </p>
                    </div>
                    <hr className='text-gray-300 block md:hidden ' />
                    {/* card 2 */}

                    <div className='px-10 md:px-15  flex justify-center flex-col py-10   md:border-r md:border-r-gray-300 text-gray-600
                    hover:text-white  hover:bg-[#5f6FFF] hover:border-[#5f6FFF] transition-all duration-300 cursor-pointer
                    '>
                        <p className=' mt-2 text-lg md:text-2xl font-bold uppercase'>Convenience : </p>
                        <p className='mt-5 text-sm md:text-lg  font-medium'>
                            Access to a network of trusted
                            <br />
                            healthcare professionals in your area.
                        </p>
                    </div>
                    <hr className='text-gray-300 block md:hidden ' />

                    {/* card 3 */}

                    <div className='px-10 md:px-15  flex justify-center flex-col py-10 text-gray-600 
                    hover:text-white  hover:bg-[#5f6FFF] hover:border-[#5f6FFF] 
                    transition-all duration-300 cursor-pointer 
                    '>
                        <p className=' mt-2 text-lg md:text-2xl font-bold uppercase'>Personalization: </p>
                        <p className='mt-5 text-sm md:text-lg  font-medium'>
                            Tailored recommendations and reminders
                            <br />
                            to help you stay on top of your health.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
