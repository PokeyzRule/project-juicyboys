const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('./post').schema
const Entrepreneur = require('./entrepreneur').schema

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owners: {
        type: [Entrepreneur],
        required: true
    },
    documents: {
        type: [String],
        default: []
    },
    posts: {
        type: [Post],
        default: []
    },
    followers: {
        type: [String],
        default: []
    },
    companyID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = Company = mongoose.model('company', companySchema)
