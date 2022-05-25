const Journal = require('../models/journal')
const Review = require('../models/review')


const createNewReview = async (req, res) => {
    const journal = await Journal.findById(req.params.journalId)
    const review = new Review(req.body.review)
    review.author = req.user._id
    journal.reviews.push(review)
    await review.save()
    await journal.save()
    req.flash('success', 'Review added successfully!')
    res.redirect(`/journals/${journal._id}`)
}

const deleteReview = async (req, res) => {
    const {
        journalId,
        reviewId
    } = req.params
    await Journal.findByIdAndUpdate(journalId, {
        $pull: {
            reviews: reviewId
        }
    })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review deleted successfully!')
    res.redirect(`/journals/${journalId}`)
}

const reviewController = {
    createNewReview: createNewReview,
    deleteReview: deleteReview
}

module.exports = reviewController
