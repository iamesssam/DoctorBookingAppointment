const express = require("express");

const cors = require('cors');
require('dotenv').config();


const { connectDB } = require('./config/mongodb');

const connectCloudinary = require('./config/cloudinary');

const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const userRoutes = require('./routes/userRoutes');

//app config 
const app = express();
const PORT = process.env.PORT;

connectDB();

connectCloudinary();
//middlewares 
app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user", userRoutes);

//api endpoint
// app.use("/", (req, res) => {
// res.send("API WORKING FINE" + PORT);
// })

app.listen(PORT, () => console.log("Server is running on port " + PORT));


