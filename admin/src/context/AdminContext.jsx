import { createContext, useEffect, useState } from "react";

import axios from "axios";
export const AdminContext = createContext();
import { toast } from "sonner";
const AdminContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") ?
        localStorage.getItem("token") : ""
    )

    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/admin/allDoctors",
                // {},
                {
                    headers: { "token": token }
                }
            );
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post("http://localhost:4000/api/admin/changeAvailability",
                { docId },
                {
                    headers: { "token": token }
                }
            )
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/admin/allAppointments",
                {
                    headers: { "token": token }
                }
            )
            if (data.success) {

                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    // useEffect(() => {
    // getAllDoctors();
    // }, [token]);


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post("http://localhost:4000/api/admin/cancelAppointment",
                { appointmentId }
                ,
                {
                    headers: { "token": token }
                }
            )
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/admin/dashboard",
                {
                    headers: { "token": token }
                }
            );
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        token, setToken,
        getAllDoctors,
        doctors,
        changeAvailability,
        getAllAppointments,
        appointments, setAppointments,
        cancelAppointment,
        getDashData,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;