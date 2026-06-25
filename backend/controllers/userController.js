const User = require("../models/User");

const validator = require('validator');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const cloudinary = require('cloudinary').v2;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// STRIPE_SECRET_KEY

//API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({ success: false, message: "All fields are required" });
        }

        //validate if its email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        //check the length of the password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password" });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save();


        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({
            success: true,
            message: `Welcome ${user.name} 👋🏻`,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


//API to Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ success: false, message: "All fields are required" });
        }



        //find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //check if the password is the same 
        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({
            success: true,
            message: `Welcome back ${user.name} 👋🏻`,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}



//API to get user profile data

const getProfile = async (req, res) => {
    try {
        // const { userId } = req.body;
        const userId = req.userId;
        const userData = await User.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User data not found" });
        }

        res.status(201).json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}



//API to update user profile data

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, address, gender, dob, phone } = req.body;
        const imageFile = req.file;


        await User.findByIdAndUpdate(userId, {
            name, phone, address: JSON.parse(address),
            dob, gender
        })

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            })

            const imageURL = imageUpload.secure_url;

            await User.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.status(201).json({ success: true, message: "Profile updated successfully ✅" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


//API to book appointment

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;

        const { docId, slotDate, slotTime } = req.body;

        const doctorData = await Doctor.findById(docId).select("-password");
        if (!doctorData) return res.status(404).json({
            success: false,
            message: "Doctor not found"
        });

        if (!doctorData.available) {
            return res.status(404).json({
                success: false,
                message: "Doctor not available"
            });
        }

        let slots_booked = doctorData.slots_booked;


        //checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(404).json({
                    success: false,
                    message: "This slot is booked"
                });

            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await User.findById(userId).select("-password");

        delete doctorData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: doctorData,
            amount: doctorData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();

        //save new slots data in docData
        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully ✅",
            newAppointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}



//API to get user appointments for my appointments page 

const listAppointments = async (req, res) => {
    try {
        const userId = req.userId;

        const appointments = await Appointment.find({ userId });

        if (!appointments) return res.status(404).json({
            success: false,
            message: "no appointments booked yet"
        });

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
        const userId = req.userId;

        const { appointmentId } = req.body;

        const appointmentData = await Appointment.findById(appointmentId);

        if (appointmentData.userId !== userId) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized action"
            })
        }

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


//API to make payment of appointment using stripe 
const paymentStripe = async (req, res) => {

    try {

        const { appointmentId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.status(404).json({
                success: false,
                message: "Appointment cancelled or not found"
            })
        }

        // 1. تجميع الخيارات لـ Stripe (زي ما المينتور عمل للـ razorpay)
        // ضربنا في 100 لأن سترايب بيتعامل بالسنتات (1 دولار = 100 سنت)
        const options = {
            amount: Math.round(appointmentData.amount * 100),
            currency: "usd", // سترايب بيطلب العملة lowercase
            metadata: {
                receipt: appointmentId // بنخزن الـ ID هنا كـ سجل للعملية
            },
            automatic_payment_methods: {
                enabled: true,
            }
        }

        // 2. إنشاء الـ Payment Intent (البديل المباشر لـ order في الـ razor pay)
        const order = await stripe.paymentIntents.create(options);

        // 3. بنرجع الاستجابة للفرونت إند بنفس الطريقة
        // بنبعت الـ paymentIntent كامل عشان الفرونت إند ياخد منه الـ client_secret والـ id براحته
        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false })
    }
}


// API to verify payment of stripe
const verifyStripePayment = async (req, res) => {
    try {
        // 1. بنستقبل الـ appointmentId والـ paymentIntentId اللي جايين من الفرونت إند
        const { appointmentId, paymentIntentId } = req.body;

        // 2. بنسأل سيرفر سترايب عن حالة العملية باستخدام الـ retrieve
        const orderInfo = await stripe.paymentIntents.retrieve(paymentIntentId);

        // 3. نتأكد إن حالة الدفع في سترايب نجحت فعلياً (succeeded)
        if (orderInfo.status === "succeeded") {

            // 4. نحدث الحجز في الداتابيز لـ payment: true
            await Appointment.findByIdAndUpdate(appointmentId, { payment: true });

            // 5. نرجع رد بالنجاح
            return res.json({
                success: true,
                message: "Payment successful ✅"
            });
        } else {
            // لو الحالة مش succeeded
            return res.status(400).json({
                success: false,
                message: "Payment failed or pending"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}




module.exports = {
    registerUser, loginUser, getProfile, updateProfile, bookAppointment,
    listAppointments, cancelAppointment, paymentStripe, verifyStripePayment
}