// const jwt = require('jsonwebtoken');

//admin authentiation middleware

// const admin = async (req, res, next) => {
//     try {
//         const { token } = req.headers;

//         if (!token) {
//             return res.status(404).json({ message: "not authorized log in again" });
//         }

//         const decode = await jwt.verify(token, process.env.JWT_SECRET);

//         if (decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.status(404).json({ message: "not authorized log in again" });
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }


const jwt = require('jsonwebtoken');

//بنتاكد اذا كان ادمن او لا عن طريق بنجيب التوكن ونقارنه بالتكون اللي معانا

const admin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(404).json({ message: "not authorized log in again" });
        }
        // essamali21@icloud.com

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            // if (token_decode !== essamali21@icloud.com + essamali21) {

            return res.status(404).json({ message: "not authorized log in again" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



module.exports = { admin };

