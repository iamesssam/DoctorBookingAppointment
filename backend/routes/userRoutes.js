const express = require('express');

const { registerUser, loginUser, getProfile, updateProfile
    , bookAppointment, listAppointments, cancelAppointment, paymentStripe
    , verifyStripePayment
} = require("../controllers/userController");


const authUser = require('../middlewares/authUser');
const upload = require('../middlewares/multer');
// const { route } = require('./adminRoutes');


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getProfile);
router.post("/updateProfile", upload.single("image"), authUser, updateProfile)
router.post("/bookAppointment", authUser, bookAppointment);
router.get("/myAppointments", authUser, listAppointments);
router.post("/cancelAppointment", authUser, cancelAppointment);
router.post("/stripePayment", authUser, paymentStripe);
router.post("/verifyPayment", authUser, verifyStripePayment);

module.exports = router;

