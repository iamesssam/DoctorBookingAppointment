
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

const validator = require('validator');

const jwt = require('jsonwebtoken');
//API for adding doctor

const Doctor = require("../models/Doctor");
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree,
            experience, about, fees, address
        } = req.body;

        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree
            || !experience || !about || !fees || !address) {
            return res.status(404).json({ message: "all fields are required" });
        }

        //validate email format 
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "enter a valid email"
            });
        }

        //validate a strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary

        // const imageUpload = await cloudinary.uploader.upload(imageFile.path,
        // { resource_type: "image" })
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type:
                "image"
        });
        const imageUrl = imageUpload.secure_url;


        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: `Doctor ${newDoctor.name} Added` })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}



//API for admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "all fields are required"
            });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.status(201).json({ success: true, token, message: "Welcome back admin" });
        }

        res.status(404).json({ success: false, message: "Invalid Credentials" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


//API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password");
        if (!doctors) return;

        res.status(200).json({
            doctors, success: true, message: "All Doctors Fetched Successfully ✅"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


//API to get all appointments list 
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find({});

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "NO Appointments found"
            })
        }

        res.status(201).json({
            success: true,
            appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


//API to cancel appointment 

const cancelAppointment = async (req, res) => {
    try {

        const { appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);


        //cancel the appointment
        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

        //relasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await Doctor.findById(docId)

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        res.status(201).json({
            success: true,
            message: "Appointment Cancelled ✅"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false })
    }
}


//API to get dashboard data for admin panel 

const adminDashboard = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        const users = await User.find({});
        const appointments = await Appointment.find({});

        const dashData = {
            doctors: doctors.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.status(201).json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false })
    }
}




module.exports = {
    addDoctor, adminLogin, allDoctors, appointmentsAdmin,
    cancelAppointment, adminDashboard
};
