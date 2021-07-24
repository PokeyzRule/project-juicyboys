const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Company = require('./company').schema

const entrepreneurSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    following: {
        type: [Company],
        default: []
    },
    associatedStartups: {
        type: [String],
        required: true
    },
    entrepreneurID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = Entrepreneur = mongoose.model('entrepreneur', entrepreneurSchema)
