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
    Owners: {
        type: [Entrepreneur],
        required: true
    },
    Documents: {
        type: [String],
        default: []
    },
    Posts: {
        type: [Post],
        default: []
    },
    companyID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = Company = mongoose.model('company', companySchema)
