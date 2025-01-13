const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.SALTROUNDS, 10)

const authController = {
    login:( async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        
        let hashedPassword = user.password;
        const isPassword = await bcrypt.compare(password, hashedPassword);
        
        if(isPassword) {
            res.status(202).send({msg: "User found!", user: user})
        } else {
            res.status(404).send({msg: "User not found"})
        }
    }),
    register: ((req, res) => {
        const {email, password, repeatPassword} = req.body;
        if(password === repeatPassword) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err) console.log(err, "error")
                const user = new User({
                    email: email,
                    password: hash
                });
                user.save();
                let role = "user";
                const jwtToken = jwt.sign({email, role}, process.env.SUPERSECRETJWT)
                res.cookie(jwtToken, {
                    httpOnly: true, 
                    maxAge: "5d",
                    secure: process.env.NODE_ENV === "production"
                });
                res.status(201).send({msg: "Sucsessfully signed up", user:user});
            })
        } else {
            res.send({msg: "Please check your signup"})
        }
    })
};

module.exports = authController;