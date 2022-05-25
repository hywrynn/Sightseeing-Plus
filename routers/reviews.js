const express = require('express')
const router = express.Router({
    mergeParams: true
})
const catchAsync = require('../utils/catchAsync')
const reviewController = require('../controllers/reviews')
const {
    validateReview
} = require('../middleware')


router.route('/')
    .post(validateReview, catchAsync(reviewController.createNewReview))

router.route('/:reviewId')
    .delete(catchAsync(reviewController.deleteReview))

module.exports = router
