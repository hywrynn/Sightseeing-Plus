const express = require('express')
const router = express.Router()
const journalController = require('../controllers/journals')


router.route('/')
    .get(journalController.renderAllJournalsPage)
    .post(journalController.createNewJournal)

router.route('/new')
    .get(journalController.renderNewJournalPage)

router.route('/:id')
    .get(journalController.renderJournalDetail)
    .put(journalController.updateJournal)
    .delete(journalController.deleteJournal)

router.route('/:id/edit')
    .get(journalController.renderEditJournalPage)

module.exports = router
