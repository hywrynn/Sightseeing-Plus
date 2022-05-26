const express = require('express')
const router = express.Router()
const journalController = require('../controllers/journals')
const catchAsync = require('../utils/catchAsync')
const {
    validateJournal,
    isLoggedIn,
    isJournalAuthor
} = require('../middleware')
const multer = require('multer')
const {
    storage
} = require('../cloudinary')
const upload = multer({
    storage
})


router.route('/')
    .get(catchAsync(journalController.renderAllJournalsPage))
    .post(isLoggedIn, upload.array('image'), validateJournal, catchAsync(journalController.createNewJournal))

router.route('/new')
    .get(isLoggedIn, journalController.renderNewJournalPage)

router.route('/:id')
    .get(catchAsync(journalController.renderJournalDetail))
    .put(isLoggedIn, isJournalAuthor, upload.array('image'), validateJournal, catchAsync(journalController.updateJournal))
    .delete(isLoggedIn, isJournalAuthor, catchAsync(journalController.deleteJournal))

router.route('/:id/edit')
    .get(isLoggedIn, isJournalAuthor, catchAsync(journalController.renderEditJournalPage))

module.exports = router
