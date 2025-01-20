const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJwt = require("../utils/createJwt.js")
const createCookie = require("../utils/createCookie.js")

const saltRounds = parseInt(process.env.SALTROUNDS, 10)

const authController = {
    login:( async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        
        const role = "user";
        let hashedPassword = user.password;
        const isPassword = await bcrypt.compare(password, hashedPassword);
        
        if(isPassword) {
            const jwtToken = createJwt(email, role);
            createCookie(res, jwtToken);
            res.status(202).send({msg: "User found!", user: user});
        } else {
            res.status(404).send({msg: "User not found"})
        }
    }),
    register: ((req, res) => {
        const {email, password, repeatPassword} = req.body;
        const role = "user";
        if(password === repeatPassword) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err) console.log(err, "error");
                    const user = new User({
                        email: email,
                        password: hash,
                        role: role
                });
                user.save();
                const jwtToken = createJwt(email, role);
                createCookie(res, jwtToken);
                res.status(201).send({msg: "Sucsessfully signed up", user:user});
            });
        } else {
            res.send({msg: "Please check your signup"})
            console.log(password, repeatPassword, email)
        }
    })
};

module.exports = authController;