

const express = require('express');
const { doctorList, loginDoctor, doctorAppointments,
    appointmentComplete, cancelAppointment
} = require('../controllers/doctorController');
const doctor = require('../middlewares/authDoctor');
const router = express.Router();


router.get("/allDoctors", doctorList);
router.post("/doctorLogin", loginDoctor);
router.get("/doctorAppointments", doctor, doctorAppointments)
router.post("/complete", doctor, appointmentComplete);
router.post("/cancel", doctor, cancelAppointment);
module.exports = router;



