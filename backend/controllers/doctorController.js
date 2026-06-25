
const Doctor = require("../models/Doctor");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Appointment = require("../models/Appointment");

//API to change doctor availability

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await Doctor.findById(docId);
        if (!doctorData) return;

        await Doctor.findByIdAndUpdate(docId, { available: !doctorData.available });

        res.status(201).json({ success: true, message: "Availability Changed ✅" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}


const doctorList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password");
        if (!doctors) return;

        res.status(200).json({
            success: true, message: "All Doctors fetched successfully",
            doctors
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

//API for doctor login

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        };

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET);
        res.status(201).json({
            success: true, token,
            message: `welcome back Dr.${doctor.name}`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}



//API to get doctor appointments for doctor panel

const doctorAppointments = async (req, res) => {
    try {
        const docId = req.docId;

        // const doctor = await Doctor.findOne({email});
        const doctorAppointments = await Appointment.find({ docId: docId });

        if (!doctorAppointments) {
            res.json({ message: "No Appointments yet" });
        }

        res.status(201).json({ success: true, doctorAppointments })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}



//API to mark appointment completed for doctor panel 
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId;

        const { appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);

        if (!appointmentData && appointmentData.docId !== docId) {
            return res.status(404).json({ success: false, message: "Appointment noy found" })
        }

        await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });
        return res.status(201).json({
            success: true,
            message: "Appointment Completed ✅"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}




//API to cancel appointment  for doctor panel 
const cancelAppointment = async (req, res) => {
    try {
        const docId = req.docId;

        const { appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);

        if (!appointmentData && appointmentData.docId !== docId) {
            return res.status(404).json({ success: false, message: "Cancellation Failed" })
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
        return res.status(201).json({
            success: true,
            message: "Appointment Cancelled ✅"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}




module.exports = {
    changeAvailability, doctorList,
    loginDoctor, doctorAppointments, appointmentComplete, cancelAppointment
};



