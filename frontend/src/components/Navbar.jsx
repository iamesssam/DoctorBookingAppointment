import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import { useContext, useState } from "react";
import profilePic from "../assets/profile_pic.png"
import dropdown from "../assets/dropdown_icon.svg"
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    // const [token, setToken] = useState(true);

    const { token, setToken, userData } = useContext(AppContext);
    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
    }

    return (
        //     <div className="flex justify-between items-center  border-b
        //     border-b-gray-400
        //     py-5 mb-5">
        //         <div>
        //             <Link to="/">
        //                 <img src={logo} alt="" className="w-44 cursor-pointer"

        //                 />
        //             </Link>
        //         </div>
        //         <div>
        //             <ul className="hidden md:flex items-center gap-5 t font-medium ">
        //                 <NavLink to="/">
        //                     <li className="py-1">HOME</li>
        //                     <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
        //                 </NavLink>

        //                 <NavLink to="/doctors">
        //                     <li className="py-1">ALLDOCTORS</li>
        //                     <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
        //                 </NavLink>

        //                 <NavLink to="/about">
        //                     <li className="py-1">ABOUT</li>
        //                     <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
        //                 </NavLink>
        //                 <NavLink to="/contact">
        //                     <li className="py-1">CONTACT</li>
        //                     <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
        //                 </NavLink>
        //             </ul>
        //         </div>

        //         <div className="flex items-center gap-4">
        //             {
        //                 token ?
        //                     <div className="flex items-center gap-3 cursor-pointer">
        //                         <img src={profilePic} alt=""
        //                             className="w-8 rounded-full" onClick={() => setShow(!show)}
        //                         />
        //                         <img src={dropdown} alt="" className="w-2.5" onClick={() => setShow(!show)} />
        //                         {/* <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 
        //                         ${show ? "block" : "hidden"}

        //                         `}> */}
        //                         <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${show ? "block" : "hidden"}`}>
        //                             <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 mr-15
        //                             mt-5
        //                             ">
        //                                 <p className="hover:text-black cursor-pointer"
        //                                     onClick={() => {
        //                                         setShow(false)
        //                                         navigate("/myProfile")
        //                                     }
        //                                     }
        //                                 >My Profile</p>
        //                                 <p className="hover:text-black cursor-pointer"
        //                                     onClick={() => {
        //                                         setShow(false)
        //                                         navigate("/myAppointments")
        //                                     }
        //                                     }
        //                                 >My Appointments</p>
        //                                 <p className="hover:text-black cursor-pointer"
        //                                     onClick={() => setToken(false)}
        //                                 >Logout</p>
        //                             </div>
        //                         </div>
        //                         <img src={assets.menu_icon} className="w-6 md:hidden" alt=""
        //                             onClick={() => setShowMenu(true)}
        //                         />

        //                         {/* ---------------Mobile Menu------------------ */}
        //                         <div className={`
        //                         ${showMenu ? "fixed w-full" : "h-0 w-0"}
        //                         md:hidden right-0 top-0 bottom-0 bg-white
        //                             z-20 overflow-hidden transition-all
        //                             `}>
        //                             <div className="flex items-center justify-between px-5 
        //                             py-6
        //                             ">
        //                                 <img src={assets.logo} alt="" className="w-36" onClick={() => navigate("/")} />
        //                                 <img onClick={() => setShowMenu(false)}
        //                                     src={assets.cross_icon} alt=""
        //                                     className="w-7"
        //                                 />
        //                             </div>
        //                             <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
        //                                 <NavLink
        //                                     to="/" onClick={() => setShowMenu(false)}>
        //                                     <p className="px-4 py-2 rounded inline-block">
        //                                         Home
        //                                     </p>
        //                                 </NavLink>


        //                                 <NavLink to="/doctors" onClick={() => setShowMenu(false)}
        //                                 >
        //                                     <p className="px-4 py-2 rounded inline-block">
        //                                         ALL DOCTORS
        //                                     </p>
        //                                 </NavLink>


        //                                 <NavLink to="/about" onClick={() => setShowMenu(false)}>
        //                                     <p className="px-4 py-2 rounded inline-block">
        //                                         ABOUT
        //                                     </p>
        //                                 </NavLink>

        //                                 <NavLink to="/contact" onClick={() => setShowMenu(false)}>
        //                                     <p className="px-4 py-2 rounded inline-block">
        //                                         CONTACT
        //                                     </p>
        //                                 </NavLink>

        //                             </ul>
        //                         </div>
        //                     </div>
        //                     :
        //                     <button
        //                         className="py-3 px-8 bg-[#5f6FFF] text-white rounded-full font-light
        //             hidden md:block cursor-pointer
        //             "
        //                         onClick={() => navigate("/login")}
        //                     >Create account</button>
        //             }
        //         </div>
        //     </div>
        // )

        <div className="flex justify-between items-center border-b border-b-gray-400 py-5 mb-5">
            <div>
                <Link to="/">
                    <img src={logo} alt="" className="w-44 cursor-pointer" />
                </Link>
            </div>
            <div>
                <ul className="hidden md:flex items-center gap-5 font-medium">
                    <NavLink to="/">
                        <li className="py-1">HOME</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
                    </NavLink>

                    <NavLink to="/doctors">
                        <li className="py-1">ALL DOCTORS</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
                    </NavLink>

                    <NavLink to="/about">
                        <li className="py-1">ABOUT</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
                    </NavLink>
                    <NavLink to="/contact">
                        <li className="py-1">CONTACT</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden bg-[#5f6FFF]" />
                    </NavLink>
                </ul>
            </div>

            <div className="flex items-center gap-4">
                {
                    token ?
                        /* 1. ضفنا relative هنا عشان الـ absolute يتحكم فيه صح */
                        /* 2. ونقلنا الـ onClick هنا عشان يلقط الضغطة من الصورة أو السهم بالتساوي */
                        <div
                            className="flex items-center gap-3 cursor-pointer relative"
                            onClick={() => setShow(!show)}
                        >
                            <img src={userData.image ? userData.image : profilePic} alt="" className="w-8 rounded-full" />
                            <img src={dropdown} alt="" className="w-2.5" />

                            {/* تظبيط الـ absolute عشان ينزل مظبوط تحت الصورة بالظبط */}
                            <div className={`absolute top-full right-0 pt-2 text-base font-medium text-gray-600 z-20 ${show ? "block" : "hidden"}`}>
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md">
                                    <p className="hover:text-black cursor-pointer"
                                        onClick={() => {
                                            setShow(false)
                                            navigate("/myProfile")
                                        }}
                                    >My Profile</p>
                                    <p className="hover:text-black cursor-pointer"
                                        onClick={() => {
                                            setShow(false)
                                            navigate("/myAppointments")
                                        }}
                                    >My Appointments</p>
                                    <p className="hover:text-black cursor-pointer"
                                        onClick={() => logout()}
                                    >Logout</p>
                                </div>
                            </div>

                            <img src={assets.menu_icon} className="w-6 md:hidden" alt=""
                                onClick={(e) => {
                                    e.stopPropagation(); // عشان منيو الموبايل متضربش مع الـ dropdown الأساسية
                                    setShowMenu(true);
                                }}
                            />

                            {/* ---------------Mobile Menu------------------ */}
                            <div className={`
                                ${showMenu ? "fixed w-full" : "h-0 w-0"}
                                md:hidden right-0 top-0 bottom-0 bg-white
                                z-20 overflow-hidden transition-all
                            `}>
                                <div className="flex items-center justify-between px-5 py-6">
                                    <img src={assets.logo} alt="" className="w-36" onClick={() => navigate("/")} />
                                    <img onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(false);
                                    }}
                                        src={assets.cross_icon} alt=""
                                        className="w-7"
                                    />
                                </div>
                                <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                                    <NavLink to="/" onClick={() => setShowMenu(false)}>
                                        <p className="px-4 py-2 rounded inline-block">Home</p>
                                    </NavLink>

                                    <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
                                        <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
                                    </NavLink>

                                    <NavLink to="/about" onClick={() => setShowMenu(false)}>
                                        <p className="px-4 py-2 rounded inline-block">ABOUT</p>
                                    </NavLink>

                                    <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                                        <p className="px-4 py-2 rounded inline-block">CONTACT</p>
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                        :
                        <button
                            className="py-3 px-8 bg-[#5f6FFF] text-white rounded-full font-light hidden md:block cursor-pointer"
                            onClick={() => navigate("/login")}
                        >Create account</button>
                }
            </div>
        </div>
    )
}

export default Navbar
