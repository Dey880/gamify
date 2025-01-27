const Review = require("../models/ReviewSchema.js");

const reviewController = {
    createReview: (async (req, res) => {
        const { gameid } = req.params;
        const { comment, recommended, stars } = req.body;
        const email = req.user.email;
        let userId = req.user.id;

        const review = await Review.create({
            user: userId,
            game: gameid,
            comment: comment,
            recommended: recommended,
            stars: stars,
        });
        if(review) {
            res.status(201).send({ msg: "Review successfully created", review: review })
        } else {
            res.status(500).send({ msg: "Something happened", review: review })
        }

    }),
    getReviewByGame: (async () => {

    }),
    getReviewByUser: (async () => {

    }),
    getReview: (async () => {

    }),
    deleteReview: (async () => {

    })
}
module.exports = reviewController