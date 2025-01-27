const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController.js");
const verifyJwt = require("../middleware/verifyToken.js")

router.post("/:gameId", verifyJwt, reviewController.createReview);
router.get("/games/:id", reviewController.getReviewByGame);
router.get("/user/:id", reviewController.getReviewByUser);

router.get("/:id", reviewController.getReview);
router.delete("/:id", reviewController.deleteReview);


module.exports = router;