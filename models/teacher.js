const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Company = require('./company').schema

const teacherSchema = new Schema({
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
    teacherID: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    currentCourses: {
        type: [String],
        required: true
    }
})

module.exports = Teacher = mongoose.model('teacher', teacherSchema)
