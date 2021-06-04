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
    currentCourses: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = User = mongoose.model('user', userSchema)
