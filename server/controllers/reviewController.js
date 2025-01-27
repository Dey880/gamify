const Review = require("../models/ReviewSchema.js");
const Game = require("../models/GameSchema.js");

const reviewController = {
    createReview: (async (req, res) => {
        const { gameId } = req.params;
        const { comment, recommended, stars } = req.body;
        let userId = req.user.id;
        try {
            const review = await Review.create({
                user: userId,
                game: gameId,
                comment: comment,
                recommended: recommended,
                stars: stars,
            });
            if(review) {
                const updateGame = await Game.findByIdAndUpdate(gameId, {$push: {reviews: review._id}});
                res.status(201).send({ msg: "Review successfully created", review: review });
            } else {
                res.status(500).send({ msg: "Something happened", review: review });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    getReviewByGame: (async (req, res) => {
        const { id } = req.params;
        try {
            const reviews = await Review.find({ game: id });
            if (reviews) {
                res.status(200).send({ msg: "Reviews found!", reviews: reviews });
            } else {
                res.status(404).send({ msg: "No reviews found" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    getReviewByUser: (async (req, res) => {
        const { id } = req.params;
        try {
            const reviews = await Review.find({ user: id });
            if (reviews) {
                res.status(200).send({ msg: "Reviews found!", reviews: reviews });
            } else {
                res.status(404).send({ msg: "No reviews found" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    getReview: (async (req, res) => {
        const { id } = req.params;
        try {
            const review = await Review.findById(id);
            if (review) {
                res.status(200).send({ msg: "Review found!", review: review });
            } else {
                res.status(404).send({ msg: "Review not found " });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    deleteReview: (async (req, res) => {
        const { id } = req.params;
        try {
            const review = await Review.findByIdAndDelete(id);
            if (review) {
                res.status(200).send({ msg: "Review deleted successfully", review: review });
            } else {
                res.status(500).send({ msg: "Something happened" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    })
};
module.exports = reviewController;