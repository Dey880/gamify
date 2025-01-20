const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    age: Number,
    adr: [{
        address: String,
        zipCode: String,
        city: String
    }]
});

const User = model("User", userSchema)
module.exports = User;