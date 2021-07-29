const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
    type: {
        type: String,
    },
    ID: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    following: {
        type: [String],
        default: []
    },
})

module.exports = User = mongoose.model('User', userSchema)
