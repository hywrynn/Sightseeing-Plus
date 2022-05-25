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
