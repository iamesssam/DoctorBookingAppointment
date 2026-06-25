
import groupImg from "../assets/group_profiles.png"
import headerPic from "../assets/header_img.png"
import arrow from "../assets/arrow_icon.svg"


const Header = () => {
    return (
        <div className="bg-[#5f6FFF] w-full min-h-[600px] rounded-xl flex flex-col md:flex-row
         items-center
        px-6 md:px-10 lg:px-20
        ">

            {/* left side */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10
            m-auto md:py-[10vw] md:mb-[-30px]
            ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold
                 leading-tight">
                    Book Appointment
                    <br />
                    With Trusted Doctors
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-3 mt-5 mb-50 md:mb-0
                ">
                    <img src={groupImg} alt="" className="w-28" />
                    <p className="text-white text-sm">
                        Simply browse through our extensive list of trusted doctors,
                        <br className="hidden sm:block" />
                        schedule your appointment hassle-free.
                    </p>

                </div>
                <div className="absolute bottom-[50%]   
                left-15 md:left-65 md:bottom-[33%]">
                    <a href="#speciality" className="bg-white flex gap-3 py-4 px-12 rounded-full
                     hover:scale-105 transition-all duration-300 
                     cursor-pointer text-gray-600  text-center">
                        Book appointment <img src={arrow} alt="" />
                    </a>
                </div>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 relative">
                {/* التعديل هنا: شيلنا bottom-40 وخلينا الـ absolute يشتغل من أول الـ md بس */}
                <img src={headerPic} alt=""
                    className="w-full md:absolute md:bottom-[-300px] h-auto rounded-lg" />
            </div>
        </div>
    )
}

export default Header
