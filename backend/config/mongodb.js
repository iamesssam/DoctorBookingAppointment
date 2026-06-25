const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected successfully✅");

    } catch (error) {

        console.log('MONGO DB CONNECTION ERROR ❌');
        console.error(error.message);
    }
}

module.exports = { connectDB };

