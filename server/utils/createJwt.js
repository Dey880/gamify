const jwt = require("jsonwebtoken");
require("dotenv").config();

function createJwt(email, role) {
    const jwtToken = jwt.sign({email, role}, process.env.SUPERSECRETJWT);
    return jwtToken;
}

module.exports = createJwt;