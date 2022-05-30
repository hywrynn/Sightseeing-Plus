const Journal = require('../models/journal')
const {
    cloudinary
} = require('../cloudinary/index')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({
    accessToken: mapBoxToken
})


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
    const geoData = await geocoder.forwardGeocode({
        query: req.body.journal.location,
        limit: 1
    }).send()
    const journal = new Journal(req.body.journal)
    journal.geometry = geoData.body.features[0].geometry
    journal.images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    journal.author = req.user._id
    await journal.save()
    req.flash('success', 'Journal added successfully!')
    res.redirect(`/journals/${journal._id}`)
}

const renderJournalDetail = async (req, res) => {
    const journal = await Journal.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
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
    const imgs = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    journal.images.push(...imgs)

    const geoData = await geocoder.forwardGeocode({
        query: req.body.journal.location,
        limit: 1
    }).send()
    journal.geometry = geoData.body.features[0].geometry

    await journal.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await journal.updateOne({
            $pull: {
                images: {
                    filename: {
                        $in: req.body.deleteImages
                    }
                }
            }
        })
    }
    req.flash('success', 'Journal updated successfully!')
    res.redirect(`/journals/${journal._id}`)
}

const deleteJournal = async (req, res) => {
    const journal = await Journal.findById(req.params.id)

    // delete related images in cloudinary
    if (journal.images) {
        for (let img of journal.images) {
            await cloudinary.uploader.destroy(img.filename)
        }
    }

    await Journal.deleteOne(journal._id)
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
