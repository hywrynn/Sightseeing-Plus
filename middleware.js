const {
    journalSchema,
    reviewSchema
} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Journal = require('./models/journal')
const Review = require('./models/review')


module.exports.validateJournal = (req, res, next) => {
    const {
        error
    } = journalSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const {
        error
    } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Sorry, you must sign in first!')
        return res.redirect('/login')
    }
    next()
}

module.exports.isJournalAuthor = async (req, res, next) => {
    const {
        id
    } = req.params
    const journal = await Journal.findById(id)
    if (!journal.author.equals(req.user._id)) {
        req.flash('error', 'Sorry, you do not have permission.')
        return res.redirect(`/journals/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const {
        journalId,
        reviewId
    } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Sorry, you do not have permission.')
        return res.redirect(`/journals/${journalId}`)
    }
    next()
}
