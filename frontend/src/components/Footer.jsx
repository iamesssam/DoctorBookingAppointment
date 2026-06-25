import React from 'react'
import logo from "../assets/logo.svg"
const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40'>


                {/* left section */}
                <div className=''>
                    <img src={logo} alt="" className='mb-5 w-40' />
                    <p className='w-full md:w-2/3 text-gray-500'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of
                        type and scrambled it to make a type specimen book.
                    </p>
                </div>

                {/* Center section */}
                <div>
                    <h2 className='text-2xl font-semibold'>COMPANY</h2>
                    <ul className='mt-5 flex flex-col gap-5'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-2xl font-semibold'>GET IN TOUCH</h2>
                    <ul className='flex flex-col gap-3'>
                        <li className='mt-2'>+0-000-000-000</li>
                        <li>essamali19@icloud.com</li>
                    </ul>
                </div>
            </div >

            {/* Copy Right */}
            < div className='text-center mt-8 mb-6'>
                <hr className='text-gray-300' />
                <p className='py-5 text-center font-medium text-lg'>Copyright 2026 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
