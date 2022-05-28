const mongoose = require('mongoose')
const Schema = mongoose.Schema


const codeSchema = new Schema({
    token: String,
    used: Boolean
})

module.exports = mongoose.model("Code", codeSchema)
