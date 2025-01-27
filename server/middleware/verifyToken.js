const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema.js")
require("dotenv").config();

async function verifyJwt(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;

    await jwt.verify(jsonwebtoken, process.env.SUPERSECRETJWT, (async (err, decoded) => {
        if(err) {
            console.error(err);
            res.status(401).send({ msg: "user not authenticated" });
        };

        let email = decoded.email;
        req.user = decoded;
        try {
            const user = await User.findOne({ email });            
            req.user.id = user._id;
        } catch (error) {
            res.status(404).send({ msg: "No user found" })
            console.error(error)
            return;
        }


    })).then(() => {
        next();
    });
};

module.exports = verifyJwt;