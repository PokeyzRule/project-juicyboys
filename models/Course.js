const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        required: True,
    },
    teacher: {
        type: String,
        required: True,
    },
    description: {
        type: String,
        required: True,
    },
    students: {
        type: [String],
        default: [],
    },
    posts: {
        type: [Object],
        default: [],
    },
    color: {
        type: String,
        required: True,
    },
    courseID: {
        type: Schema.Types.ObjectId,
        auto: True,
    },
})

module.exports = Course = mongoose.model('course', CourseSchema)