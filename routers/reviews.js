const express = require('express')
const router = express.Router({
    mergeParams: true
})
const catchAsync = require('../utils/catchAsync')
const reviewController = require('../controllers/reviews')
const {
    validateReview,
    isLoggedIn,
    isReviewAuthor
} = require('../middleware')


router.route('/')
    .post(isLoggedIn, validateReview, catchAsync(reviewController.createNewReview))

router.route('/:reviewId')
    .delete(isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router
