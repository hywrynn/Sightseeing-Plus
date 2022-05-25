const {
    journalSchema,
    reviewSchema
} = require('./schemas')
const ExpressError = require('./utils/ExpressError')


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
