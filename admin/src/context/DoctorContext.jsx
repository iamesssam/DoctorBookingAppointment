import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { toast } from "sonner";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ?
        localStorage.getItem('dToken') : "")

    const [appointments, setAppointments] = useState([]);

    const listAppointments = async () => {
        try {
            const { data } = await axios.get("https://doctorbookingappointment-backend.onrender.com/api/doctor/doctorAppointments",
                {
                    headers: { "dToken": dToken }
                }
            )
            if (data.success) {
                setAppointments(data.doctorAppointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/doctor/complete",
                { appointmentId },
                { headers: { "dToken": dToken } }
            )

            if (data.success) {
                toast.success(data.message);
                listAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post("https://doctorbookingappointment-backend.onrender.com/api/doctor/cancel",
                { appointmentId },
                { headers: { "dToken": dToken } }
            )
            if (data.success) {
                toast.success(data.message);
                listAppointments();

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }




    const value = {
        setDToken,
        dToken,
        appointments,
        listAppointments,
        completeAppointment,
        cancelAppointment
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}


export default DoctorContextProvider;
