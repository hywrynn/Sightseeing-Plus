const Journal = require('../models/journal')


const renderAllJournalsPage = async (req, res) => {
    const journals = await Journal.find({})
    res.render('journals/index', {
        journals
    })
}

const renderNewJournalPage = async (req, res) => {
    res.render('journals/new')
}

const createNewJournal = async (req, res) => {
    const journal = new Journal(req.body)
    await journal.save()
    res.redirect(`/journals/${journal._id}`)
}

const renderJournalDetail = async (req, res) => {
    const journal = await Journal.findById(req.params.id)
    res.render('journals/show', {
        journal
    })
}

const renderEditJournalPage = async (req, res) => {
    const journal = await Journal.findById(req.params.id)
    res.render('journals/edit', {
        journal
    })
}

const updateJournal = async (req, res) => {
    const journal = await Journal.findByIdAndUpdate(req.params.id, {
        ...req.body
    })
    res.redirect(`/journals/${journal._id}`)
}

const deleteJournal = async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id)
    res.redirect('/journals')
}

const journalController = {
    renderAllJournalsPage: renderAllJournalsPage,
    renderNewJournalPage: renderNewJournalPage,
    createNewJournal: createNewJournal,
    renderJournalDetail: renderJournalDetail,
    renderEditJournalPage: renderEditJournalPage,
    updateJournal: updateJournal,
    deleteJournal: deleteJournal
}

module.exports = journalController
