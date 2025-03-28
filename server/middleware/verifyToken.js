const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema.js");
require("dotenv").config();

async function verifyJwt(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;
    if (!jsonwebtoken) {
        return res.status(401).send({ msg: "No token provided" });
    }

    try {
        const decoded = await jwt.verify(jsonwebtoken, process.env.SUPERSECRETJWT);
        
        let email = decoded.email;
        req.user = decoded;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: "No user found" });
        }
        req.user.id = user._id;
        next();
    } catch (err) {
        return res.status(401).send({ msg: "User not authenticated" });
    }
}

module.exports = verifyJwt;