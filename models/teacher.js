const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    teacherID: {
        type: String,
        required: true
    },
    currentCourses: {
        type: [String],
        required: true
    }
})

module.exports = Teacher = mongoose.model('teacher', teacherSchema)
