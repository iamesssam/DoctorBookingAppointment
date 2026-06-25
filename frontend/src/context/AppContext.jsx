import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
export const AppContext = createContext();


const AppContextProvider = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ?
        localStorage.getItem('token') : ""
    );

    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get("https://doctorbookingappointment-backend.onrender.com/api/doctor/allDoctors");
            setDoctors(data.doctors);
        } catch (error) {
            toast.error(error.message);
        }
    }


    const userProfileData = async () => {
        try {
            const { data } = await axios.get("https://doctorbookingappointment-backend.onrender.com/api/user/profile",
                {
                    headers: { "token": token }
                }
            )
            if (data.success) {
                // toast.success()
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            userProfileData();
        } else {
            setUserData("");
        }
    }, [token])



    useEffect(() => {
        getDoctorsData();
    }, []);

    const value = {
        doctors,
        token, setToken, userData, setUserData,
        userProfileData, getDoctorsData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
