const express = require('express')
const router = express.Router()
const journalController = require('../controllers/journals')
const catchAsync = require('../utils/catchAsync')


router.route('/')
    .get(catchAsync(journalController.renderAllJournalsPage))
    .post(catchAsync(journalController.createNewJournal))

router.route('/new')
    .get(journalController.renderNewJournalPage)

router.route('/:id')
    .get(catchAsync(journalController.renderJournalDetail))
    .put(catchAsync(journalController.updateJournal))
    .delete(catchAsync(journalController.deleteJournal))

router.route('/:id/edit')
    .get(catchAsync(journalController.renderEditJournalPage))

module.exports = router
