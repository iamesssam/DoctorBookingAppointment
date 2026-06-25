const jwt = require('jsonwebtoken');


const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(404).json({ message: "not authorized log in again" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // req.body.userId = decode.id;
        req.userId = decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}


module.exports = authUser;