const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Game",
        required: true
        },
    comment: String,
    recommended: Boolean,
    stars: {
        type: Number,
        min: [1, "Please enter a positive integer between 1 and 6"],
        max: [6, "Please enter a positive integer between 1 and 6"]
    }
});

const Review = model("Review", reviewSchema);

module.exports = Review;