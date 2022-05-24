if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const journalRouter = require('./routers/journals')
const ExpressError = require('./utils/ExpressError')


// build mongo atlas connection
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connection success")
})

// ejs support and set path for views
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// parse incoming requests
app.use(express.urlencoded({
    extended: true
}))

// use HTTP verbs the client doesn't support
app.use(methodOverride('_method'))

// set path for public
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/journals', journalRouter)

// home page route
app.get('/', (req, res) => {
    res.render('home')
})

// page not found
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// handle errors
app.use((err, req, res, next) => {
    const {
        statusCode = 500
    } = err;
    if (!err.message) {
        err.message = 'Sorry, something went wrong :('
    }
    res.status(statusCode).render('error', {
        err
    })
})

// app listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
