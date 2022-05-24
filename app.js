if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')


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

// home page route
app.get('/', (req, res) => {
    res.render('home')
})

// app listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
