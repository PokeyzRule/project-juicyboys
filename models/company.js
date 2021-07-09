const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('./post').schema

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
        type: [String],
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
    companyID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = Company = mongoose.model('company', companySchema)
