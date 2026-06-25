
const express = require('express');
const { addDoctor, adminLogin, allDoctors,
    appointmentsAdmin, cancelAppointment, adminDashboard
} = require('../controllers/adminController');

const { changeAvailability } = require("../controllers/doctorController");
const upload = require('../middlewares/multer');
const { admin } = require('../middlewares/authAdmin');

const router = express.Router();

router.post("/addDoctor", admin, upload.single("image"), addDoctor);
router.post("/login", adminLogin);
router.get("/allDoctors", admin, allDoctors);
router.post("/changeAvailability", admin, changeAvailability);
router.get("/allAppointments", admin, appointmentsAdmin);
router.post("/cancelAppointment", admin, cancelAppointment);
router.get("/dashboard", admin, adminDashboard);
// router.get("/allAppointments", appointmentsAdmin);

module.exports = router;
