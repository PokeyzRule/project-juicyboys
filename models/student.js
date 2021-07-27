const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
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
    studentID: {
        type: Schema.Types.ObjectId,
        auto: true
    }
})

module.exports = Student = mongoose.model('student', studentSchema)
