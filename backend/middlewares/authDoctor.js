
const jwt = require('jsonwebtoken');

const doctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(404).json({
                success: false,
                message: "No Authorized"
            })
        }

        const decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


module.exports = doctor;