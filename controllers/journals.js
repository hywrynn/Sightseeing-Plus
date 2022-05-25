const Journal = require('../models/journal')


const renderAllJournalsPage = async (req, res) => {
    const journals = await Journal.find({})
    res.render('journals/index', {
        journals
    })
}

const renderNewJournalPage = (req, res) => {
    res.render('journals/new')
}

const createNewJournal = async (req, res) => {
    const journal = new Journal(req.body.journal)
    await journal.save()
    req.flash('success', 'Journal added successfully!')
    res.redirect(`/journals/${journal._id}`)
}

const renderJournalDetail = async (req, res) => {
    const journal = await Journal.findById(req.params.id).populate('reviews')
    if (!journal) {
        req.flash('error', 'No journal found!')
        return res.redirect('/journals')
    }
    res.render('journals/show', {
        journal
    })
}

const renderEditJournalPage = async (req, res) => {
    const journal = await Journal.findById(req.params.id)
    if (!journal) {
        req.flash('error', 'No journal found!')
        return res.redirect('/journals')
    }
    res.render('journals/edit', {
        journal
    })
}

const updateJournal = async (req, res) => {
    const journal = await Journal.findByIdAndUpdate(req.params.id, {
        ...req.body.journal
    })
    req.flash('success', 'Journal updated successfully!')
    res.redirect(`/journals/${journal._id}`)
}

const deleteJournal = async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id)
    req.flash('success', 'Journal deleted successfully!')
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
